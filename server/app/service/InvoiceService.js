// Create Invoice
import {ObjectId} from "mongodb";
import CartsModel from "../models/cartsModel.js";
import ProfileModel from "../models/profilesModel.js";
import InvoicesModel from "../models/invoicesModel.js";
import InvoicesProductModel from "../models/invoiceProductsModel.js";
import PaymentSettingModel from "../models/PaymentSettingModel.js";
import axios from "axios";

export const CreateInvoiceService = async (req) => {
    try{

        const userId = new ObjectId(req.headers['user_id']);
        const cus_email = req.headers['email'];

        // ============= Step 01: Calculate total payable & vat =============

        const MatchingStage = {$match: {userID: userId}};

        const JoinWithProductStage = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as: 'product'}};

        const UnwindWithProductStage = {$unwind: '$product'};

        const ProjectStage = {$project: {
            _id: 0,
        }};

        const cartProducts = await CartsModel.aggregate([
            MatchingStage,
            JoinWithProductStage,
            UnwindWithProductStage,
            ProjectStage
        ]);

        let totalAmount = 0;

        cartProducts.forEach((element) => {

            let qty = parseFloat(element['qty']);
            let OriginalPrice = parseFloat(element['product']['price']);
            let discountPrice = parseFloat(element['product']['discountPrice']);
            let discount = element['product']['discount'];

            let price;

            if(discount){
                price = discountPrice;
            }else {
                price = OriginalPrice;
            }

            totalAmount += qty * price;

        });

        let vat = totalAmount * .05 // assuming 5% vat
        let payable = totalAmount + vat;


        // ============= Step 02: Prepare customer details and shipping details =============

        const profile = await ProfileModel.aggregate([
            MatchingStage
        ]);

        let cus_details = `Name: ${profile[0]['cus_name']}, Email: ${cus_email}, Address: ${profile[0]['cus_add']}, Phone: ${profile[0]['cus_phone']},`;
        let ship_details = `Name: ${profile[0]['ship_name']}, City: ${profile[0]['ship_city']}, Address: ${profile[0]['ship_add']}, Phone: ${profile[0]['ship_phone']},`;


        // ============= Step 03: Transaction and other id =============

        const tran_id = Math.floor(10000000+Math.random()*90000000);
        let val_id = 0;
        let delivery_status = 'pending';
        let payment_status = 'pending';


        // ============= Step 04: Create voice =============

        const createInvoice = await InvoicesModel.create({

            total: totalAmount,
            vat: vat,
            payable: payable,
            cus_details: cus_details,
            ship_details: ship_details,
            val_id: val_id,
            tran_id: tran_id,
            delivery_status: delivery_status,
            payment_status: payment_status,
            user_id: userId,

        });


        // ============= Step 05: Create invoice product =============

        let invoice_id = createInvoice['_id'];

        const invoiceProductPromises = cartProducts.map(element => {
            return InvoicesProductModel.create({
                qty: element['qty'],
                price: element['product']['discount'] ? element['product']['discountPrice'] : element['product']['price'],
                color: element['color'],
                size: element['size'],
                invoiceID: invoice_id,
                productID: element['product']['_id'],  // Ensure this is product._id
                userID: userId,
            });
        });

        // Wait for all the invoice products to be created
        await Promise.all(invoiceProductPromises);


        // ============= Step 06: Remove cart =============

        await CartsModel.deleteMany({userID: userId});


        // ============= Step 07: Prepare SSL payment =============
        let paymentSettings = await PaymentSettingModel.find();

        const form = new FormData();
        form.append('store_id', paymentSettings[0]['store_id']);
        form.append('store_passwd', paymentSettings[0]['store_passwd']);
        form.append('total_amount', payable.toString());
        form.append('currency', paymentSettings[0]['currency']);
        form.append('tran_id', tran_id);

        form.append('success_url', `${paymentSettings[0]['success_url']}/${tran_id}`);
        form.append('fail_url', `${paymentSettings[0]['fail_url']}/${tran_id}`);
        form.append('cancel_url', `${paymentSettings[0]['cancel_url']}/${tran_id}`);
        form.append('ipn_url', `${paymentSettings[0]['ipn_url']}/${tran_id}`);

        form.append('cus_name', profile[0]['cus_name']);
        form.append('cus_email', cus_email);
        form.append('cus_add1', profile[0]['cus_add']);
        form.append('cus_add2', profile[0]['cus_add']);
        form.append('cus_city', profile[0]['cus_city']);
        form.append('cus_state', profile[0]['cus_state']);
        form.append('cus_postcode', profile[0]['cus_postcode']);
        form.append('cus_country', profile[0]['cus_country']);
        form.append('cus_phone', profile[0]['cus_phone']);
        form.append('cus_fax', profile[0]['cus_phone']);

        form.append('shipping_method', 'YES');

        form.append('ship_name', profile[0]['ship_name']);
        form.append('ship_add1', profile[0]['ship_add']);
        form.append('ship_add2', profile[0]['ship_add']);
        form.append('ship_city', profile[0]['ship_city']);
        form.append('ship_state', profile[0]['ship_state']);
        form.append('ship_postcode', profile[0]['ship_postcode']);
        form.append('ship_country', profile[0]['ship_country']);
        form.append('ship_phone', profile[0]['ship_phone']);
        form.append('ship_fax', profile[0]['ship_phone']);

        form.append('product_name', 'According to invoice');
        form.append('product_category', 'According to invoice');
        form.append('product_profile', 'According to invoice');
        form.append('product_amount', 'According to invoice');

        let SSLRes = await axios.post(paymentSettings[0]['init_url'], form);


        return { status: 'success', message: 'Invoice created successfully!', data: SSLRes.data };
    }catch (e) {
        return { status: 'fail', data: e.toString() };
    }
}


export const PaymentSuccessService = async (req) => {
    try{

        const trxID = req.params['trxID'];

        await InvoicesModel.updateOne({tran_id: trxID}, {payment_status: 'success'});

        return { status: 'success', message: 'Payment successfully completed!' }
    }catch (e) {
        return { status: 'fail', data: e.toString() };
    }
}

export const PaymentFailService = async (req) => {
    try{

        const trxID = req.params['trxID'];

        await InvoicesModel.updateOne({tran_id: trxID}, {payment_status: 'fail'});

        return { status: 'fail', message: 'Payment failed!' }
    }catch (e) {
        return { status: 'fail', data: e.toString() };
    }
}

export const PaymentCancelService = async (req) => {
    try{

        const trxID = req.params['trxID'];

        await InvoicesModel.updateOne({tran_id: trxID}, {payment_status: 'cancel'});

        return { status: 'cancel', message: 'Payment canceled!' }
    }catch (e) {
        return { status: 'fail', data: e.toString() };
    }
}

export const PaymentIPNService = async (req) => {
    try{

        const trxID = req.params['trxID'];
        const status = req.body['status'];

        await InvoicesModel.updateOne({tran_id: trxID}, {payment_status: status});

        return { status: `${status}`, message: `Payment ${status}` }
    }catch (e) {
        return { status: 'fail', data: e.toString() };
    }
}

export const ReadInvoiceService = async (req) => {
    try {

        const userId = new ObjectId(req.headers['user_id']);

        const MatchingStage = {$match: {user_id: userId}};

        const data = await InvoicesModel.aggregate([
            MatchingStage
        ]);

        return { status: 'success', message: 'Invoice read successfully!', data: data };
    }catch (e) {
        return { status: 'fail', data: e.toString() };
    }
}

export const ReadInvoiceProductService = async (req) => {
    try{

        const userId = new ObjectId(req.headers['user_id']);
        const invoiceId = new ObjectId(req.params['id']);

        const MatchingStage = {$match: {userID: userId, invoiceID: invoiceId}};

        const JoinWithProductStage = {$lookup: {from: 'products', localField: 'productID', foreignField: '_id', as: 'product'}};

        const UnwindProductStage = {$unwind: '$product'};

        const data = await InvoicesProductModel.aggregate([
            MatchingStage,
            JoinWithProductStage,
            UnwindProductStage
        ]);

        return { status: 'success', message: 'Invoice product read successfully!', data: data }
    }catch (e) {
        return { status: 'fail', data: e.toString() };
    }
}























