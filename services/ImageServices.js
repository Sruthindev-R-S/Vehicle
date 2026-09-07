const Imagemodel = require("../models/ImageBucket")

const ImageServices = {
    async addImage(file){
        return Imagemodel.UploadImage(file);
    },
    async deleteImage(image_url) {
        return Imagemodel.deleteImage(image_url);
    }
};

module.exports = ImageServices;