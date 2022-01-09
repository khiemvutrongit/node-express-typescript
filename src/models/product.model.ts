import { Model, model, Schema, Date, Document, Types } from "mongoose";
import { IName, NameSchema } from "./name.model";
import subModel from "./submodel";

export interface IProductFrom {
  key: string;
  value: string;
}

export interface IProducts extends Document {
  accountId: string;
  name: Array<IName>;
  image: string;
  publicQuantity: boolean;
  quantity: number;
  publicPrice: boolean;
  price: number;
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
    name: [NameSchema],
    image: {
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
    },
    public: {
      type: Boolean,
      default: false,
    },
  },
  {
    versionKey: false,
  }
);

export interface IProductDocument extends IProducts {}
export interface IProductModel extends Model<IProductDocument> {}

export const ProductModel = model<IProductDocument, IProductModel>(
  subModel.products,
  ProductSchema
);
