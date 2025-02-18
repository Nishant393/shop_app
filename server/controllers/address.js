import { Address } from "../models/address.js";

// CREATE Address
export const createAddress = async (req, res) => {
  try {
    const { street, city, state, phoneNumber, postalCode, country, type } = req.body;
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }

    const newAddress = new Address({
      user: userId,
      street,
      city,
      state,
      phoneNumber,
      postalCode,
      country,
      type,
    });

    await newAddress.save();

    res.status(201).json({
      success: true,
      message: "Address created successfully",
      data: newAddress,
    });
  } catch (error) {
    console.error("Error creating address:", error);
    res.status(500).json({
      success: false,
      message: "Error creating address",
      error: error.message,
    });
  }
};

// GET all addresses of logged-in user
export const getAddresses = async (req, res) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }

    const addresses = await Address.find({ user: userId });

    res.status(200).json({
      success: true,
      data: addresses,
    });
  } catch (error) {
    console.error("Error fetching addresses:", error);
    res.status(500).json({
      success: false,
      message: "Error fetching addresses",
      error: error.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  const userId = req.user?._id;
  const { street, city, state, phoneNumber, postalCode, country, type } = req.body;

  try {
    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }

    // Find address belonging to logged-in user
    const address = await Address.findOne({ user: userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }

    address.street = street ?? address.street;
    address.city = city ?? address.city;
    address.state = state ?? address.state;
    address.phoneNumber = phoneNumber ?? address.phoneNumber;
    address.postalCode = postalCode ?? address.postalCode;
    address.country = country ?? address.country;
    address.type = type ?? address.type;

    await address.save();

    res.status(200).json({
      success: true,
      message: "Address updated successfully",
      data: address,
    });
  } catch (error) {
    console.error("Error updating address:", error);
    res.status(500).json({
      success: false,
      message: "Error updating address",
      error: error.message,
    });
  }
};

// DELETE Address (Only Logged-in User Can Delete Their Address)
export const deleteAddress = async (req, res) => {
  const user = req.user?._id;

  try {
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized. Please log in.",
      });
    }

    // Find and delete only the address belonging to the logged-in user
    const address = await Address.findAndDelete(user);

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not found",
      });
    }
console.log(address)
    res.status(200).json({
      success: true,
      message: "Address deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting address:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting address",
      error: error.message,
    });
  }
};
