import { Request } from "express";
import { Model, model, Schema, Date, Document } from "mongoose";
import { IPaginateOptions, paginate } from "./plugins/paginate.plugin";
import subModel from "./submodel";

export interface IProductFrom {
  key: string;
  value: string;
}

export interface IProducts {
  accountId: string;
  name: string;
  image: string;
  publicQuantity: boolean;
  quantity: number;
  publicPrice: boolean;
  price: number;
  path: string;
  conditions: Array<string>;
  brands: Array<string>;
  categories: Array<string>;
  technicalSpecifications: string;
  productFrom: string;
  createdBy: string;
  modifiedBy: string;
  createdAt?: Date;
  modifiedAt?: Date;
  active?: boolean;
  public?: boolean;
}

const ProductSchema = new Schema<IProductDocument, IProductModel>(
  {
    accountId: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    publicQuantity: {
      type: Boolean,
      default: false,
    },
    quantity: {
      type: Number,
      min: 0,
      default: 0,
    },
    publicPrice: {
      type: Boolean,
      default: false,
    },
    price: {
      type: Number,
      min: 0,
    },
    conditions: [
      {
        type: String,
      },
    ],
    brands: [
      {
        type: String,
      },
    ],
    categories: [
      {
        type: String,
      },
    ],
    technicalSpecifications: {
      type: String,
      maxlength: 1000,
    },
    productFrom: {
      type: String,
    },
    createdBy: String,
    modifiedBy: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
    modifiedAt: {
      type: Date,
      default: Date.now,
    },
    active: {
      type: Boolean,
      default: false,
      select: false
    },
    public: {
      type: Boolean,
      default: false,
      select: false
    },
  },
  {
    versionKey: false,
  }
);

// add plugin that paginate
ProductSchema.plugin(paginate);

export interface IProductDocument extends IProducts, Document {}
export interface IProductModel extends Model<IProductDocument> {
  paginate(req: Request, options: IPaginateOptions): void;
}

export const ProductModel = model<IProductDocument, IProductModel>(
  subModel.products,
  ProductSchema
);
