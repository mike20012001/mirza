import authenticate from '../middlewares/authenticate'

const router = require('express').Router();


router.post('/', authenticate, (req, res) => {
    res.status(201).json({ succeess: true });
//    res.status(201).json({ user : req.currentUser });
});

export default router;
