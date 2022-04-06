import { Schema, model } from 'mongoose';


interface Product {
  prodName: string;
  prodDesc: string;
  prodPicture: string;
  prodPrice: number;
  createAt?: Date;
  updateAt?: Date;
  prodDiscount: Schema.Types.ObjectId;
}

const schema = new Schema<Product>({
  prodName: { type: String, required: true },

  prodDesc: { type: String, required: true },

  prodPicture: { type: String, required: true },

  prodPrice: { type: Number, required: true },

  createAt: {
    type: Date,
    default: Date.now()
  },

  updateAt: {
    type: Date,
    default: Date.now()
  },

  prodDiscount: { type: Schema.Types.ObjectId, ref: 'Discount' }

})

export const ProductModel = model<Product>('Product', schema);
