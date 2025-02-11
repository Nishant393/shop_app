
import { Cart } from "../models/cart.js";
import { Products } from "../models/product.js";

// export const addToCart = async (req, res) => {
//   try {
//     const { productId, quantity = 1 } = req.body;
//     const userId = req.user._id;

//     const product = await Products.findById(productId);
//     if (!product) {
//       return res.status(404).json({ message: "Product not found" });
//     }

//     const discount = product.discount || 0;
//     const discountedPrice = product.price * (1 - discount / 100);

//     let cartItem = await Cart.findOne({ user: userId, "product._id": productId });

//     if (cartItem) {
//       const newQuantity = cartItem.quantity + quantity;

//       if (newQuantity > product.stock) {
//         return res.status(400).json({
//           message: `Cannot add. Only ${product.stock} items available in stock`,
//         });
//       }
//       cartItem.quantity = newQuantity;
//         cartItem.totalPrice = newQuantity * discountedPrice;
//         console.log()
//       //  const totalvalue = cartItem.totalPrice
//     } else {
//       if (quantity > product.stock) {
//         return res.status(400).json({
//           message: `Only ${product.stock} items available in stock`,
//         });
//       }

//       cartItem = new Cart({
//         user: userId,
//         product: { ...product.toObject() }, // Save full product object
//         quantity,
//         totalPrice: "jhjr" ,
//       });
//     }

//     await cartItem.save();
//     res.status(200).json(cartItem);
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({ message: error.message });
//   }
// };



export const addToCart = async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;
    const userId = req.user._id;

    const product = await Products.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Validate product price
    if (typeof product.price !== 'number' || isNaN(product.price)) {
      return res.status(400).json({ message: "Invalid product price" });
    }

    // Calculate discounted price with validation
    const discount = product.discount || 0;
    if (typeof discount !== 'number' || isNaN(discount)) {
      return res.status(400).json({ message: "Invalid discount value" });
    }

    const discountedPrice = product.price * (1 - Math.min(discount, 100) / 100);
    if (isNaN(discountedPrice) || discountedPrice < 0) {
      return res.status(400).json({ message: "Error calculating discounted price" });
    }

    let cartItem = await Cart.findOne({ user: userId, "product._id": productId });

    if (cartItem) {
      const newQuantity = cartItem.quantity + quantity;

      if (newQuantity > product.stock) {
        return res.status(400).json({
          message: `Cannot add. Only ${product.stock} items available in stock`,
        });
      }
      
      cartItem.quantity = newQuantity;
      const total = Number((newQuantity * discountedPrice).toFixed(2));
      if (isNaN(total)) {
        return res.status(400).json({ message: "Error calculating total price" });
      }
      cartItem.totalPrice = total;
    } else {
      if (quantity > product.stock) {
        return res.status(400).json({
          message: `Only ${product.stock} items available in stock`,
        });
      }

      const total = Number((quantity * discountedPrice).toFixed(2));
      if (isNaN(total)) {
        return res.status(400).json({ message: "Error calculating total price" });
      }

      cartItem = new Cart({
    
        user: userId,
        product: { ...product.toObject() },
        quantity,
        totalPrice: total,
      });
    }

    await cartItem.save();
    res.status(200).json({
      sucess:true,
        message:"product added to cart",
        cartItem
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};




export const getCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const cartItems = await Cart.find({ user: userId });

    const cartSummary = {
      items: cartItems,
      totalItems: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      totalValue: cartItems.reduce((sum, item) => sum + item.totalPrice, 0),
    };

    res.status(200).json({
      success: true,
      message:"cart fetched successfully",
      cartSummary,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { productId } = req.params;

    const cartItem = await Cart.findOneAndDelete({ user: userId, "product._id": productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    res.status(200).json({ message: "Item removed from cart" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const clearCart = async (req, res) => {
  try {
    const userId = req.user._id;

    await Cart.deleteMany({ user: userId });

    res.status(200).json({
      success:true,
       message: "Cart cleared " 

    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// export const updateCartQuantity = async (req, res) => {
//   try {
//     const { cartId } = req.params;  
//     const { quantity } = req.body;
//     const userId = req.user._id;
// console.log("cart ",cartId)
//     if (quantity <= 0) {
//       return res.status(400).json({ message: "Quantity must be at least 1" });
//     }

//     // Find the cart item by its cartId
//     const cartItem = await Cart.findOne({ _id: cartId, user: userId });
// console.log(cartItem)
//     if (!cartItem) {
//       return res.status(404).json({ message: "Cart item not found" });
//     }

//     // Check stock availability
//     if (quantity > cartItem.product.stock) {
//       return res.status(400).json({
//         message: `Only ${cartItem.product.stock} items available in stock`,
//       });
//     }

//     // Calculate new total price with discount
//     const discount = cartItem.product.discount || 0;
//     const discountedPrice = cartItem.product.price * (1 - discount / 100);

//     // Update quantity and total price
//     cartItem.quantity = Number(quantity);
//     cartItem.totalPrice = quantity * discountedPrice;
// console.log("dprice",discountedPrice)
//     await cartItem.save();

//     res.status(200).json(cartItem);
//   } catch (error) {
//     console.log(error)
//     res.status(400).json({ 
//       message: error.message });
//   }
// };



export const updateCartQuantity = async (req, res) => {
  try {
    const { _id: cartId } = req.params;
    const { quantity } = req.body;
    const userId = req.user._id;
console.log("cart",cartId)
    if (quantity <= 0) {
      return res.status(400).json({ message: "Quantity must be at least 1" });
    }

    // Find the cart item by its cartId and userId
    const cartItem = await Cart.findOne({ _id: cartId, user: userId })
    // .populate("product")
console.log("cart", cartItem)

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }
    

    // Check stock availability
    // if (quantity > cartItem.product.stock) {
    //   return res.status(400).json({
    //     message: `Only ${cartItem.product.stock} items available in stock`,
    //   });
    // }

    // Validate product price
    // if (typeof cartItem.product.price !== "number" || isNaN(cartItem.product.price)) {
    //   return res.status(400).json({ message: "Invalid product price" });
    // }
    const productId = cartItem.product
    const product = await Products.findById(productId)

    // Calculate new total price with discount
    const discount = product.discount || 0;
    const discountedPrice = product.price * (1 - Math.min(discount, 100) / 100);

    if (isNaN(discountedPrice) || discountedPrice < 0) {
      return res.status(400).json({ message: "Error calculating discounted price" });
    }

    // Update quantity and total price dynamically
    cartItem.quantity = Number(quantity);
    cartItem.totalPrice = Number((cartItem.quantity * discountedPrice).toFixed(2));

    await cartItem.save();

    res.status(200).json({
      success: true,
      message:"card update succesfully",
      cartItem,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};
