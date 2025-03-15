import mongoose from "mongoose";

const { Schema, model } = mongoose;

const orderSchema = new Schema(
  {
    orderNumber: {
      type: String,
      unique: true,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    cart: {
      type: Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true },
      phone: { type: String, required: true }
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Dispatched", "Out for delivery", "Delivered", "Cancelled", "Returned"],
      default: "Pending",
      index: true
    },
    paymentMode: {
      type: String,
      enum: ["COD", "UPI", "CARD", "NET_BANKING", "WALLET"],
      required: true,
    },
    payment: {
      transactionId: String,
      status: {
        type: String,
        enum: ["Pending", "Completed", "Failed", "Refunded"],
        default: "Pending"
      },
      paidAt: Date
    },
    delivery: {
      trackingNumber: String,
      carrier: String,
      estimatedDeliveryDate: Date,
      actualDeliveryDate: Date
    },
    subtotal: {
      type: Number,
      required: true,
      min: 0
    },
    discount: {
      type: Number,
      default: 0,
      min: 0
    },
    shippingCost: {
      type: Number,
      default: 0,
      min: 10
    },
    total: {
      type: Number,
      required: true,
      min: 0, 
    },
    customerNotes: String,
    createdAt: {
      type: Date,
      default: Date.now,
      immutable: true, 
    },
    updatedBy: {
      userId: Schema.Types.ObjectId,
      action: String,
      timestamp: {
        type: Date,
        default: Date.now
      }
    }
  },
  {
    versionKey: false,
    timestamps: true, 
  }
);

orderSchema.index({ user: 1, createdAt: -1 });
orderSchema.index({ status: 1 }); 
orderSchema.index({ "payment.status": 1 });
orderSchema.index({ orderNumber: 1 }); 

orderSchema.virtual('orderAge').get(function () {
  return Math.floor((Date.now() - this.createdAt) / (1000 * 60 * 60 * 24));
});

orderSchema.pre('save', async function (next) {
  if (!this.orderNumber) {
    const date = new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const count = await this.constructor.countDocuments();
    this.orderNumber = `ORD-${year}${month}-${(count + 1).toString().padStart(5, '0')}`;
  }
  next();
});

export default model("Order", orderSchema);
