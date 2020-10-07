const router = require('express').Router();
const Report = require('../models/Report')
import authenticate from '../middlewares/authenticate'


router.post('/', authenticate, async (req, res) => {
    console.log(req.currentUser)
    const reporter = req.body;
    console.log(reporter)
})


export default router;
