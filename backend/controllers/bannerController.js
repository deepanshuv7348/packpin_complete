const formidable = require('formidable');
const productModel = require('../models/productModel'); // Keep this declaration
const cloudinary = require('cloudinary').v2;
const { responceReturn } = require('../utiles/response');
const bannerModel = require('../models/bannerModel');
const {mongo : {ObjectId}} = require('mongoose');


class bannerController {
    add_banner = async (req, res) => {
        const form = formidable({ multiples: true })
        form.parse(req, async (err, field, files) => {
            const { productId } = field
            const { image } = files

            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })

            try {
                const { slug } = await productModel.findById(productId)
                const result = await cloudinary.uploader.upload(image.filepath, { folder: 'banners' });
                const banner = await bannerModel.create({
                    productId,
                    banner: result.url,
                    link: slug
                })
                responceReturn(res, 201, { banner, message : 'Banner added successfully' })

            } catch (error) {
                responceReturn(res, 500, {message :  error.message })

            }
        })

    }


    
    get_banner = async(req,res) => {
        const { productId } = req.params;
        try {
            const banner = await bannerModel.findOne({productId : new ObjectId(productId)})
            responceReturn(res,200,{banner})
        } catch (error) {
            responceReturn(res,500, {message: error.message})
        }
    }

    get_banners = async(req,res) => {
        try {
            const banners = await bannerModel.aggregate([
                {
                    $sample: {
                        size: 10
                    }
                }
            ]);
            
            responceReturn(res, 200, { banners });
        } catch (error) {
            responceReturn(res, 500, { message: error.message });
        }
    }
    

    update_banner = async(req,res) => {
        const {bannerId} = req.params
        const form = formidable({})

        form.parse(req, async (err, _, files)=>{
            cloudinary.config({
                cloud_name: process.env.cloud_name,
                api_key: process.env.api_key,
                api_secret: process.env.api_secret,
                secure: true
            })
            try {
                const banner = await bannerModel.findOne(bannerId)
                let temp = banner.banner.split('/')
                temp = temp[temp.length - 1]
                const imageName = temp.split('.')[0]
                await cloudinary.uploader.destroy(imageName)
                const {url} = await cloudinary.uploader.upload(image.filepath, { folder: 'banners' })

                await bannerModel.findByIdAndUpdate(bannerId,{
                    banner: url
                },{ new: true });

                banner = await bannerModel.findOne(bannerId)
                responceReturn(res,200,{banner, message : 'banner update success' })

                console.log(imageName)
            } catch (error) {
                responceReturn(res,500, {message: error.message})
                
            }

        })

        
    }
}

module.exports = new bannerController