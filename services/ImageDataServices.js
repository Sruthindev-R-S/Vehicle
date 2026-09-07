const ImageDataModel = require("../models/ImageData");

const ImageDataServices = {
	async getImageData() {
		return ImageDataModel.find();
	},

	async updateImageDataStatus(vehicleNumber) {
		return ImageDataModel.updateStatus(vehicleNumber);
	},

	async addImageData(url, vehicleNumber,phone_number) {
		return ImageDataModel.add(url, vehicleNumber,phone_number);
	},

	async deleteImageData() {
		return ImageDataModel.delete();
	}
};

module.exports = ImageDataServices;
