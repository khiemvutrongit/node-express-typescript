import { Request, Response } from "express";
import httpStatus from "http-status";
import { ProductModel, Products } from "../models";

export const CreateProductController = async (req: Request, res: Response) => {
  try {
    const body: any = req.body;
    const objCreate: Products = body;

    let result;
    try {
      result = await ProductModel.create(objCreate);
    } catch (error) {
      return res.status(httpStatus.BAD_REQUEST).json(error)
    }

    return res.status(httpStatus.CREATED).json(result);
  } catch (error) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json(error);
  }
}