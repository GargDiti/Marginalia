const router = require('express').Router();
const auth = require('../middleware/auth');
const c = require('../controllers/postController');
router.get('/', c.list);
router.get('/mine', auth, c.mine);
router.post('/', auth, c.create);
// Keep the fixed `id` path ahead of `/:slug`; otherwise Express treats
// `/id/:id` as a slug and public lookup returns "Story not found".
router.get('/id/:id', auth, c.getMine);
router.get('/:slug', c.getBySlug);
router.patch('/:id', auth, c.update);
router.delete('/:id', auth, c.remove);
router.post('/:id/like', auth, c.toggleLike);
module.exports = router;
