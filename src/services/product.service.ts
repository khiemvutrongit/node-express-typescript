import { Payload } from "../middleware";
import { isValidObjectId, ObjectId } from "mongoose";
import { IProductDocument, ProductModel } from "../models";

export const createProductService = (product: IProductDocument) => {
  return ProductModel.create(product);
}

export const updateProductService = async (id: string, payload: Payload, product: IProductDocument) => {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid Id");
    throw {
      status: 400,
      message: error
    }
  }

  if (!payload) {
    const error = new Error("Missing payload");
    throw {
      status: 400,
      message: error
    }
  }

  if (!product) {
    const error = new Error("Invalid Data Update");
    throw {
      status: 400,
      message: error
    }
  }

  const document = await ProductModel.findOne({
    _id: id,
    accountId: payload.acc,
    active: false
  });

  if (!document) {
    const error = new Error("Not Found");
    throw {
      status: 404,
      message: error
    }
  }

  Object.assign(document, product);

  document.validate(Object.keys(product || {}));
  await document.save();

  return document;
}

export const deleteProductService = async (id: string, payload: Payload) => {
  if (!isValidObjectId(id)) {
    const error = new Error("Invalid Id");
    throw {
      status: 400,
      message: error
    }
  }

  if (!payload) {
    const error = new Error("Missing payload");
    throw {
      status: 400,
      message: error
    }
  }

  const document = await ProductModel.findOne({
    _id: id,
    accountId: payload.acc,
    active: false
  });

  if (!!!document) {
    const error = new Error("Not Found");
    throw {
      status: 404,
      message: error
    }
  }

  document.active = true;
}