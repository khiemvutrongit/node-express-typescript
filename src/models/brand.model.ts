import { model, Model, Schema } from "mongoose";
import { IName, NameSchema } from "./name.model";
import { IPaginateOptions, paginate } from "./plugins/paginate.plugin";
import subModel from "./submodel";

export interface IBrand {
  accountId: string;
  name: Array<IName>;
  image: string;
  path: string;
  createdBy: string;
  modifiedBy: string;
  createdAt?: Date;
  modifiedAt?: Date;
  public?: boolean;
  active?: boolean;
}

const BrandSchema = new Schema<IBrandDocument, IBrandModel>({
  accountId: {
    type: String,
    required: true,
    select: false
  },
  name: [NameSchema],
  image: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: true
  },
  createdBy: String,
  modifiedBy: String,
  createdAt: {
    type: Date,
    default: Date.now
  },
  modifiedAt: {
    type: Date,
    default: Date.now
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
  }
});

// add plugin that paginate
BrandSchema.plugin(paginate);

export interface IBrandDocument extends IBrand, Document {}
export interface IBrandModel extends Model<IBrandDocument> {
  paginate(req: Request, options: IPaginateOptions): void;
}

export const BrandModel = model<IBrandDocument, IBrandModel>(
  subModel.brands,
  BrandSchema
);
