const express = require('express')
const router = express.Router()
const API  = require('../controllers/api')
const multer = require('multer')

// Multer Middleware
let img_storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/img/')
    },
    filename: (req, file, cb)=>{
        cb(null, file.fieldname+"_"+Date.now()+"_"+file.originalname)
    }
})

let upload_image = multer({
    storage: img_storage
}).single('image')

router.get('/', API.fetchAllPosts)
router.get('/:postId', API.fetchPostById)
router.post('/',upload_image ,API.createPost)
router.patch('/:postId', upload_image, API.updatePost)
router.delete('/:postId', API.deletePost)

module.exports = router