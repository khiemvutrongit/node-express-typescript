import { Request } from "express";
import { BAD_REQUEST, NOT_FOUND } from "http-status";
import { isValidObjectId, Types } from "mongoose";
import { Payload } from "../middleware";
import { IProductDocument, IProducts, ProductModel } from "../models";
import { IPaginateOptions } from "../models/plugins/paginate.plugin";

export const createProductService = (product: IProducts) => {
  return ProductModel.create(product);
};

export const updateProductService = async (
  id: string,
  payload: Payload,
  product: IProductDocument
) => {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid Id");
    throw {
      status: BAD_REQUEST,
      message: error,
    };
  }

  if (!payload) {
    const error = new Error("Missing payload");
    throw {
      status: BAD_REQUEST,
      message: error,
    };
  }

  if (Object.keys(product).length === 0) {
    const error = new Error("Invalid Data Update");
    throw {
      status: BAD_REQUEST,
      message: error,
    };
  }

  const document = await ProductModel.findOne({
    _id: id,
    accountId: payload.acc,
    active: false,
  });

  if (!document) {
    const error = new Error("Not Found");
    throw {
      status: NOT_FOUND,
      message: error,
    };
  }

  Object.assign(document, product);

  await document.save();

  return document;
};

export const deleteProductService = async (id: string, payload: Payload) => {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid Id");
    throw {
      status: BAD_REQUEST,
      message: error,
    };
  }

  if (!payload) {
    const error = new Error("Missing payload");
    throw {
      status: BAD_REQUEST,
      message: error,
    };
  }

  const document = await ProductModel.findOne({
    _id: new Types.ObjectId(id),
    accountId: payload.acc,
    active: false,
  });

  if (!!!document) {
    const error = new Error("Not Found");
    throw {
      status: NOT_FOUND,
      message: error,
    };
  }

  document.active = true;
  return document.save();
};

export const getProductsService = async (
  req: Request,
  options: IPaginateOptions
) => {
  return ProductModel.paginate(req, options);
};

export const getProductService = async (id: string) => {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid Id");
    throw {
      status: BAD_REQUEST,
      message: error,
    };
  }

  return ProductModel.findOne({
    _id: new Types.ObjectId(id),
    active: false,
  });
};
