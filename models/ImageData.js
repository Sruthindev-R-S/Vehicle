const supabase = require("../config/supabase")

const ImageDataModel = {
    async find(){
        const {data,error} = await supabase
            .from("image-data")
            .select('"image-url",vehicle_number,status')

        if(error){
            throw new Error(error.message)
        }

        return data
    },
    async updateStatus(vehicle_number){
        const {data,error} = await supabase
            .from("image-data")
            .update({ status: true })
            .eq("vehicle_number", vehicle_number)
            .select('"image-url",vehicle_number,status')

        if(error){
            throw new Error(error.message)
        }

        return data
    },
    async add(url,vehicle_number,phone_number){
        const {data,error} = await supabase
        .from("image-data")
        .insert({
            "image-url": url,
            "vehicle_number":vehicle_number,
            "phone_number":phone_number
        })
        .select()
        if(error){
            throw new Error(error.message)
        }
        return data
    },
    async delete() {
        const {data,error} = await supabase
            .from("image-data")
            .delete()
            .eq("status", 0)
            .select()

        if(error){
            throw new Error(error.message)
        }

        return data
    }
}

module.exports = ImageDataModel;