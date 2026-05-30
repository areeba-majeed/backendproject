import {Router} from 'express'
import {loginUser, registerUser,logoutUser} from '../controllers/user.controller.js'
import { verifyJWT } from '../middlewares/auth.middleware.js'
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

    router.route('/login').post(loginUser)
    //secured routes
    router.route('/logout').post(verifyJWT,logoutUser)
console.log("user routes loaded",router)
console.log("REGISTER ROUTES FILE EXECUTING")
console.log("ROUTES STACK:", router.stack)
export default router