const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories');

router.get('/', categoriesController.index);
router.get('/:name', categoriesController.detail);
router.post('/', categoriesController.post_categories);
router.delete('/:id', categoriesController.delete_categories);
router.put('/:id', categoriesController.update_categories);

module.exports = router;
