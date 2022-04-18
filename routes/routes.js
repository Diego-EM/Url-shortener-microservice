const db = require('../controller/dbcontroller')
const express = require('express');
const router = express.Router();

router.get('/:id', db.getURL);
router.post('/', db.addURL);

module.exports = router;