const ImageDataModel = require("../models/ImageData");

const ImageDataServices = {
	async getImageData() {
		return ImageDataModel.find();
	},

	async updateImageDataStatus(vehicleNumber, id, old_vehicle_number) {
		return ImageDataModel.updateStatus(vehicleNumber, id, old_vehicle_number);
	},

	async addImageData(url, vehicleNumber,phone_number,name) {
		return ImageDataModel.add(url, vehicleNumber,phone_number);
	},

	async deleteImageData() {
		return ImageDataModel.delete();
	}
};

module.exports = ImageDataServices;
