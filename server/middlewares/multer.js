import multer from "multer"
const storage = multer.memoryStorage();

const multerUpload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 10,
    },
})

const productImageMiddleware = multerUpload.array("productImage",5)



export {
    multerUpload,
    productImageMiddleware,
}