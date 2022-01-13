import { Request } from "express";
import { BrandModel, IBrand, IBrandDocument } from "../models";
import { BAD_REQUEST, NOT_FOUND } from "http-status";
import { isValidObjectId, Types } from "mongoose";
import { Payload } from "../middleware";
import { IPaginateOptions } from "../models/plugins/paginate.plugin";

export const createBrandService = (brand: IBrand) => {
  return BrandModel.create(brand);
};

export const updateBrandService = async (
  id: string,
  payload: Payload,
  product: IBrandDocument
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

  const document = await BrandModel.findOne({
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

export const deleteBrandService = async (id: string, payload: Payload) => {
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

  const document = await BrandModel.findOne({
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

export const getBrandService = async (id: string) => {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid Id");
    throw {
      status: BAD_REQUEST,
      message: error,
    };
  }

  return BrandModel.findOne({
    _id: new Types.ObjectId(id),
    active: false,
  });
};

export const getBrandsService = (
  req: Request,
  options: IPaginateOptions
) => {
  return BrandModel.paginate(req, options);
};
