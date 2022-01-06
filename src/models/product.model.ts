import { Model, model, Schema, Date } from "mongoose";
import { Name, NameSchema } from "./name.model";

export interface ProductFrom {
	key: string;
	value: string;
}

export interface Products {
	id: string;
	accountId: string;
	name: Name[];
	image: string;
	publicQuantity: boolean;
	quantity: number;
	publicPrice: boolean;
	price: number;
	conditions: string[];
	brands: string[];
	categories: string[];
	technicalSpecifications: string;
	productFrom: ProductFrom[];
	createdBy: string;
	modifiedBy: string;
	createdAt: Date;
	modifiedAt: Date;
	active: boolean;
}

// Start Product Schema
const ProductSchema = new Schema <Products, Model<Products>>({
	accountId: {
		type: String,
		required: true,
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
		default: 0
	},
	publicPrice: {
		type: Boolean,
		default: false,
	},
	price: {
		type: Number,
		min: 0
	},
	conditions: [String],
	brands: [String],
	categories: [String],
	technicalSpecifications: {
		type: String,
		maxlength: 1000,
	},
	productFrom: [
		{
			key: {
				type: String,
				maxlength: 1000
			},
			value: {
				type: String,
				maxlength: 1000
			},
		},
	],
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
		default: true,
	},
});
// End Product Schema

export const ProductModel = model("products", ProductSchema);