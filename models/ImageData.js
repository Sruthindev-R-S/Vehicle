const supabase = require("../config/supabase")

const ImageDataModel = {
    async find(){
        const {data,error} = await supabase
            .from("image-data")
            .select('*')

        if(error){
            throw new Error(error.message)
        }

        return data
    },
    async updateStatus(vehicle_number, id, old_vehicle_number){
        let query = supabase
            .from("image-data")
            .update({
                vehicle_number: vehicle_number,
                status: 1
            })

        if (id) {
            query = query.eq("id", id)
        } else if (old_vehicle_number) {
            query = query.eq("vehicle_number", old_vehicle_number)
        } else {
            query = query.eq("vehicle_number", vehicle_number)
        }

        const {data,error} = await query.select('id,"image-url",vehicle_number,phone_number,status')

        if(error){
            throw new Error(error.message)
        }

        return data
    },
    async add(url,vehicle_number,phone_number,name){
        const {data,error} = await supabase
        .from("image-data")
        .insert({
            "image-url": url,
            "vehicle_number":vehicle_number,
            "phone_number":phone_number,
            "name":name
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