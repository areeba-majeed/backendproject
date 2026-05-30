import {Router} from 'express'
import {registerUser} from '../controllers/user.controller.js'
const router=Router()


router.route("/register").post(registerUser)
console.log("user routes loaded",router)
console.log("REGISTER ROUTES FILE EXECUTING")
console.log("ROUTES STACK:", router.stack)
export default router