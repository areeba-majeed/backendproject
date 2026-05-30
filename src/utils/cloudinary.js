//file filesystem k through aye gi..
//jo bhi file server pr aai hai uska path lein ge..
import {v2 as cloudinary} from 'cloudinary'
//fs is filesystem..node mn filesystem hota hai..node k sath by default aati hai
//file ko read,write,delete,open krna ho to use hota hai...
import fs from 'fs'
//cloduniary configuration
cloudinary.config({
    cloud_name:process.env.CLOUDINARY_CLOUD_NAME,
    api_key:process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
//parameter mn local file ka path
//successful upload pr file unlink kr do
const uploadonCloudinary=async(localpath)=>{
    try{
        if(!localpath) return null
        //upload file
       const response = await cloudinary.uploader.upload(localpath,
            {resourse_type:'auto'}
        )
         //file has uploaded successfully
          console.log('file is uploaded on cloudinary:',response.url)
          return response;
    }
    catch(error){
        //if file is on server, but not uploaded on cloudinary
        //also used to remove malecious files
        //so unlink the files that are locally saved temporary files as the upload operation
        //got failed
        //unlinkSync bcz ye kaam ho ga to agla kaam start karain ge to prevent errors
        fs.unlinkSync(localpath)
        return null
    }
}
export {uploadonCloudinary}