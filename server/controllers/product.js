import {Products} from "../models/product.js";

// Validation schema for products


const createProduct = async (req, res, next) => {
    try {
        const createdProduct = new Products(req.body);
        console.log(req.body)
        await createdProduct.save()
        console.log("product in db",createdProduct)
        return res.status(200).json({
            message: "product added successfully ",
            createdProduct
        })

    } catch (error) {
        console.log(error);
    }
}



const searchProduct = async (req, res, next) => {
    try {
        const { productName="",limit=20,page=1 } = req.query;
        

        const searchedProduct = await Products.find({
            productName: { $regex: productName, $options: "i" }
        }).skip((page - 1) * limit)
        .limit(parseInt(limit));

        console.log(searchedProduct)

        // if (searchedProduct.length === 0) {
        //     return res.status(404).json({
        //         success: false,
        //         message: "No products found"
        //     });
        // }

        res.status(200).json({
            success: true,
            searchedProduct
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
};


const getProductById=async(req,res,next)=>{
    try {
        const {id}=req.params
        const result=await Products.findById(id);
        res.status(200).json({
            success:true,
            result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error getting product details, please try again later'})
    }
}


const getAllProducts =async (req, res,next) => {
    try {
        // const filter={}
        // const sort={}
        let skip=0
        let limit=0

        // if(req.query.brand){
        //     filter.brand={$in:req.query.brand}
        // }

        // if(req.query.category){
        //     filter.category={$in:req.query.category}
        // }

        

        // if(req.query.sort){
        //     sort[req.query.sort]=req.query.order?req.query.order==='asc'?1:-1:1
        // }

        if(req.query.page && req.query.limit){

            const pageSize=req.query.limit
            const page=req.query.page

            skip=pageSize*(page-1)
            limit=pageSize
        }

        const totalDocs=await Products.find().populate("brand").countDocuments().exec()
        const results=await Products.find().populate("brand").skip(skip).limit(limit).exec()

        res.set("X-Total-Count",totalDocs)

        res.status(200).json({
            success:true,
            results
        })
    
    } catch (error) {
        console.log(error);
        res.status(500).json({message:'Error fetching products, please try again later'})
    }
};

export { createProduct, getAllProducts, searchProduct,getProductById };

