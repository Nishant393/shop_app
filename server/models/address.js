import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const addressSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    street: {
      type: String,
      required: true,
      trim: true,
    },
    city: {
      type: String,
      required: true,
      trim: true,
    },
    state: {
      type: String,
      required: true,
      trim: true,
    },
    phoneNumber: {
      type: String,
      required: true,
      trim: true,
      match: [/^\+?\d{10,15}$/, "Please enter a valid phone number"],
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
      match: [/^\d{4,10}$/, "Please enter a valid postal code"],
    },
    country: {
      type: String,
      required: true,
      trim: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["home", "work", "other"],
    },
  },
  { timestamps: true }
);

export const Address = mongoose.models.Address || model("Address", addressSchema);
