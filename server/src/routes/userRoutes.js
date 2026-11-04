const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/userController');
router.patch('/me', auth, c.update);
router.patch('/me/password', auth, c.password);
router.get('/:id', c.get);
module.exports = router;
