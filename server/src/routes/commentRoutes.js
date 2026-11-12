const router = require('express').Router({ mergeParams: true });
const auth = require('../middleware/auth');
const c = require('../controllers/commentController');
router.get('/', c.list);
router.post('/', auth, c.create);
router.delete('/:commentId', auth, c.remove);
module.exports = router;
