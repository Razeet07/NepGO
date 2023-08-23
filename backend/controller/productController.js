exports.getProduct = (req, res, next) =>{
    res.status(200).json({
        success: true,
        message: "this route will display all products."
    })
}
