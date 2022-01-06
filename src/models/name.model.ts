import { Schema } from 'mongoose';

export interface Name {
  key: string;
  value: string;
}

export const NameSchema = new Schema({
  key: {
    type: String,
    required: true,
    maxlength: 2
  },
  value: {
    type: String,
    required: true,
    maxlength: 300
  }
})