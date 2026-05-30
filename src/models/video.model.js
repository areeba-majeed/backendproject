import mongoose from 'mongoose'
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2'
const videoSchema=new Schema({
    videFile:{
        type:String,
        required:true,
    },
    thumbnail:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    duration:{
        type:Number,
        required:true,
    },
    views:{
        type:Number,
        default:0,
    },
    isPublished:{
        type:Boolean,
        default:true
    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})

//mongoose mn bht saray middlewares add ho skte hain..
//like database mn store honay se pehle ye kro (pre) or baad mn ye kro (post)
//khud k plugin bhi add kr skte hain---aggregation query likh skte hain is se
videoSchema.plugin(mongooseAggregatePaginate)
export const Video=mongoose.model('Video',videoSchema)
