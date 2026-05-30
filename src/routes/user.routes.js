import {Router} from 'express'
import {registerUser} from '../controllers/user.controller.js'
//for file handling
import {upload} from '../middlewares/multer.middleware.js'
const router=Router()
router.route("/register").post(
    //accept the array
    upload.fields([
        {name:"avatar",
            maxCount:1
        },
        {
            name:"coverImage",
            maxCount:1
        }
    ]),
    registerUser)
console.log("user routes loaded",router)
console.log("REGISTER ROUTES FILE EXECUTING")
console.log("ROUTES STACK:", router.stack)
export default router