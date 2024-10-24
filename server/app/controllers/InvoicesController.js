import {
    CreateInvoiceService,
    PaymentCancelService,
    PaymentFailService, PaymentIPNService,
    PaymentSuccessService, ReadInvoiceProductService, ReadInvoiceService
} from "../service/InvoiceService.js";

export const CreateInvoice = async (req, res) => {
    const result = await CreateInvoiceService(req);
    res.json(result);
}

export const ReadInvoice = async (req, res) => {
    const result = await ReadInvoiceService(req);
    res.json(result);
}

export const ReadInvoiceProduct = async (req, res) => {
    const result = await ReadInvoiceProductService(req);
    res.json(result);
}

export const PaymentSuccess = async (req, res) => {
    const result = await PaymentSuccessService(req);
    res.json(result);
}

export const PaymentFail = async (req, res) => {
    const result = await PaymentFailService(req);
    res.json(result);
}

export const PaymentCancel = async (req, res) => {
    const result = await PaymentCancelService(req);
    res.json(result);
}

export const PaymentIPN = async (req, res) => {
    const result = await PaymentIPNService(req);
    res.json(result);
}





























