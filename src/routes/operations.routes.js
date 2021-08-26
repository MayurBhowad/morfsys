const express = require('express');
const router = express.Router();

//@route    GET api/operations/tests
//@dest     Test operations route
//@access   Public
router.get('/tests', (req, res) => res.json({ msg: "operations WOrks" }));

module.exports = router;