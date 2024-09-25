import express from 'express';

const router = express.Router();

import * as UsersController from '../app/controllers/UsersController.js';
import * as BrandsController from '../app/controllers/BrandsController.js';
import * as CategoriesController from '../app/controllers/CategoriesController.js';
import * as ProductsController from '../app/controllers/ProductsController.js';
import * as InvoicesController from '../app/controllers/InvoicesController.js';
import * as WishListsController from '../app/controllers/WishListsController.js';
import * as CartListsController from '../app/controllers/CartListsController.js';
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import {ProductReviewUpdate} from "../app/controllers/UsersController.js";


// Users Routes
router.post('/Login', UsersController.Login);
router.post('/VerifyLogin', UsersController.VerifyLogin);
router.post('/CreateUserProfile', AuthMiddleware, UsersController.CreateUserProfile);
router.get('/ReadUserProfile', AuthMiddleware, UsersController.ReadUserProfile);
router.post('/UpdateUserProfile', AuthMiddleware, UsersController.UpdateUserProfile);

// Brands Routes
router.get('/BrandList', BrandsController.BrandList);

// Categories Routes
router.get('/CategoriesLists', CategoriesController.CategoriesLists);

// Cart Routes
router.post('/CreateCart', AuthMiddleware, CartListsController.CreateCart);
router.get('/ReadCart', AuthMiddleware, CartListsController.ReadCart);
router.post('/UpdateCart', AuthMiddleware, CartListsController.UpdateCart);
router.post('/RemoveCart', AuthMiddleware, CartListsController.RemoveCart);

// Wish Routes
router.post('/CreateWish', AuthMiddleware, WishListsController.CreateWish);
router.get('/ReadWish', AuthMiddleware, WishListsController.ReadWish);
router.get('/RemoveWish', AuthMiddleware, WishListsController.RemoveWish);

// Create Product Review
router.post('/CreateProductReview', AuthMiddleware, UsersController.ProductReviewCreate);
router.post('/UpdateProductReview', AuthMiddleware, UsersController.ProductReviewUpdate);

// Products Routes
router.get('/ProductListByCategory/:CategoryID', ProductsController.ProductListByCategory);
router.get('/ProductListByRemark/:Remark', ProductsController.ProductListByRemark);
router.get('/ProductListByBrand/:BrandId', ProductsController.ProductListByBrand);
router.get('/ProductListBySlider', ProductsController.ProductListBySlider);
router.get('/ProductListByKeyword/:Keyword', ProductsController.ProductListByKeyword);
router.get('/ProductDetailsByID/:DetailsID', ProductsController.ProductDetailsByID);
router.get('/ProductReviewListByID/:ReviewID', ProductsController.ProductReviewListByID);
router.post('/UpdateProductReview', ProductsController.UpdateProductReview);

// Invoices Routes
router.post('/CreateInvoice', InvoicesController.CreateInvoice);
router.get('/ReadInvoice', InvoicesController.ReadInvoice);
router.get('/ReadInvoiceDetails', InvoicesController.ReadInvoiceDetails);


export default router;