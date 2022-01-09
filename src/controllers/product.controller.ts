import { Request, Response } from "express";
import { BAD_REQUEST, CREATED, INTERNAL_SERVER_ERROR } from "http-status";
import { createProductService } from "../services/product.service";
import { IProductDocument } from "../models";

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
