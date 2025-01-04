import mongoose, { Schema, model } from "mongoose";

const cartSchema = new Schema(
   {
      user: {
         type: Schema.Types.ObjectId,
         ref: "User", 
         required: true,
      },
      items: [
         {
            product: {
               type: Schema.Types.ObjectId,
               ref: "Products",
               required: true,
            },
            quantity: {
               type: Number,
               required: true,
               min: 1,
               default: 1,
            },
            price: {
               type: Number,
               required: true,
            },
         },
      ],
      totalQuantity: {
         type: Number,
         default: 0,
      },
      totalPrice: {
         type: Number,
         default: 0,
      },
   },
   {
      timestamps: true,
   }
);

cartSchema.pre("save", function (next) {
   // Automatically calculate total price and quantity
   this.totalQuantity = this.items.reduce((sum, item) => sum + item.quantity, 0);
   this.totalPrice = this.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
   next();
});

export const Cart = mongoose.models.Cart || model("Cart", cartSchema);
