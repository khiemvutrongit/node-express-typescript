import { Request, Response } from "express";
import {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  NOT_FOUND,
  OK,
} from "http-status";
import { IPaginateOptions } from "../models/plugins/paginate.plugin";
import { IBrandDocument } from "../models";
import {
  createBrandService,
  updateBrandService,
  getBrandService,
  getBrandsService,
  deleteBrandService,
} from "../services";

/**
 * Create a Brand
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
export const CreateBrandController = async (
  req: Request, 
  res: Response
): Promise<Response> => {
  try {
    const objectCreateDocument: IBrandDocument = req.body;

    let result: IBrandDocument;
    try {
      result = await createBrandService(objectCreateDocument);
    } catch (error) {
      return res.status(BAD_REQUEST).json(error);
    }

    return res.status(CREATED).json(result);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json("Unexpected Error");
  }
};

/**
 * Get list product
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
export const GetBrandsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const options: IPaginateOptions = req.query;

    let result;
    try {
      result = await getBrandsService(req, options);
    } catch (error) {
      return res.status(error.status || 400).json(error);
    }

    return res.status(OK).json(result);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json("Unexpected Error");
  }
}

/**
 * Get a Brand
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
export const GetBrandController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;

    let result;
    try {
      result = await getBrandService(id);
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
    return res.status(INTERNAL_SERVER_ERROR).json("Unexpected Error");
  }
}

/**
 * Update a Brand
 * @param req - Request parameter
 * @param res - Send JSON response.
 * @returns {Promise<Response>}
 */
export const UpdateBrandController = async (
  req: Request, 
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const { body, payload } = req;

    let result;
    try {
      result = await updateBrandService(id, payload, body);
    } catch (error) {
      return res.status(error.status).json(error);
    }

    return res.status(OK).json(result);
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json("Unexpected Error");
  }
}

export const DeleteBrandController = async (
  req: Request, 
  res: Response
): Promise<Response> => {
  try {
    const { id } = req.params;
    const payload = req.payload;

    try {
      await deleteBrandService(id, payload);
    } catch (error) {
      return res.status(error.status || BAD_REQUEST).json(error);
    }

    return res.status(204).json();
  } catch (error) {
    return res.status(INTERNAL_SERVER_ERROR).json("Unexpected Error");
  }
}