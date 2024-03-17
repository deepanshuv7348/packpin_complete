const router = require('express').Router()
const bannerController = require('../controllers/bannerController')
const { authMiddleware } = require('../middlewares/authMiddleware')


 // Assuming you have or will create a get_banners method

router.post('/api/banner/add', authMiddleware,bannerController.add_banner)

router.get('/banner/get/:productId', authMiddleware,bannerController.get_banner)
router.put('/banner/update/:bannerId', authMiddleware,bannerController.update_banner)
router.get('/banner', bannerController.get_banners); 

module.exports = router