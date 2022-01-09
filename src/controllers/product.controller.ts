import { Request, Response } from "express";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "http-status";
import {
  createProductService,
  deleteProductService,
  getProductService,
  getProductsService,
  updateProductService,
} from "../services/product.service";
import { IProductDocument } from "../models";
import { IPaginateOptions } from "../models/plugins/paginate.plugin";

/**
 * Create a new product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
export const CreateProductController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const objCreateDocument: IProductDocument = req.body;

    let result: IProductDocument;
    try {
      result = await createProductService(objCreateDocument);
    } catch (error) {
      return res.status(BAD_REQUEST).json(error);
    }

    return res.status(CREATED).json(result);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

/**
 * Get list product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
export const GetProductsController = async (req: Request, res: Response) => {
  try {
    const options: IPaginateOptions = req.query;
    
    let result;
    try {
      result = await getProductsService(req, options);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }

    return res.status(OK).json(result);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

/**
 * Get a product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
export const GetProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    let result;
    try {
      result = await getProductService(id);
    } catch (error) {
      return res.status(error.status).json(error);
    }

    if (!result) {
      const error = new Error("Not Found");
      return res.status(NOT_FOUND).json({
        status: NOT_FOUND,
        message: error,
      });
    }

    return res.status(OK).json(result);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

/**
 * Get a product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
export const UpdateProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body, payload } = req;
    
    let result;
    try {
      result = await updateProductService(id, payload, body);
    } catch (error) {
      return res.status(error.status).json(error);
    }

    return res.status(OK).json(result)
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
};

/**
 * Get a product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
export const DeleteProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.payload;

    try {
      await deleteProductService(id, payload);
    } catch (error) {
      return res.status(error.status || BAD_REQUEST).json(error)
    }

    return res.status(204).json();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json(error);
  }
}