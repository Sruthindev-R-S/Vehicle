const supabase = require("../config/supabase")
const bucketName = 'vehicle_images';

const Imagemodel={
 async  UploadImage(file) {
    const filename = `${Date.now()}-${file.originalname}`;
    const {error} = await supabase.storage
    .from(bucketName)
    .upload(filename,file.buffer,{
        contentType:file.mimetype
    })
    if(error){
        throw new Error(error.message)
    }
    const {data} = supabase.storage
    .from(bucketName)
    .getPublicUrl(filename)
    return data.publicUrl;
    
},

async  deleteImage(Imageurl) {
    const marker = `/storage/v1/object/public/${bucketName}/`
    const filepath = Imageurl.split(marker)[1]
    if(!filepath){
        throw new Error("Invalid supabase url")

    }
    
    const {error} =  await supabase.storage
    .from(bucketName)
    .remove([decodeURIComponent(filepath)])
    if(error){
        throw new Error(error.message)
    }
}
}
module.exports = Imagemodel;