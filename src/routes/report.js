const router = require('express').Router();
const Report = require('../models/Report.js')
import authenticate from '../middlewares/authenticate.js'


router.post('/', authenticate, async (req, res) => {
    console.log(req.currentUser)
    const reporter = req.body;
    console.log(reporter)
})


export default router;
