
import { Products } from "../models/product.js";
import { Wishlist } from "../models/wishlist.js";

const addToWishList = async (req, res) => {
  try {
    const { product } = req.body;
    const user = req.user;

    const query = { product, user: user._id };
    const update = { isLiked: true, updated: Date.now() };

    const updatedWishlist = await Wishlist.findOneAndUpdate(query, update, {
      new: true,
    });

    if (updatedWishlist) {
      return res.status(200).json({
        success: true,
        message: "Your Wishlist has been updated successfully!",
        wishlist: updatedWishlist,
      });
    }

    const wishlist = new Wishlist({
      product,
      isLiked: true,
      user: user._id,
    });

    const wishlistItem = await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Added to your Wishlist successfully!",
      wishlist: wishlistItem,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
};


const mywishlist = async (req, res) => {
  try {
    const user = req.user;


    const wishlist = await Wishlist.find({ user: user._id })
      .populate("product") 
      .sort({ updatedAt: -1 });
    return res.status(200).json({
      success: true,
      message: "Wishlist fetched successfully!",
      wishlist,
    });
  } catch (error) {
    console.error("Error at wishlist:", error);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again!",
    });
  }
};


const removefromWishlist = async(req,res)=>{

  const user = req.user._id;
  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized. Please log in.",
    })
  }
  const deletedProduct = await Wishlist.findByIdAndDelete(user)
  console.log(deletedProduct)
  return res.status(200).json({
    success: false,
    message: "product deleted succesfully",
  })

}
export { addToWishList ,mywishlist, removefromWishlist};
