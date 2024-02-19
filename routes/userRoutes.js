const express = require('express');
const multer = require('multer');
const validateToken = require('../middleware/validateTokenHandler')
const router = express.Router();
const {currentUser,loginUser,registerUser, uploadImage, getImage} = require('../controllers/userController')


const upload = multer({ dest: 'uploads/' });
router.post('/register',registerUser );

router.post('/login', loginUser);

router.get('/current', validateToken,currentUser);

router.post('/upload-image', validateToken, upload.single('image'), uploadImage);
router.get('/get-image', validateToken, getImage);

module.exports = router;
