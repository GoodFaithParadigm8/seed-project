const express = require('express');
const router = express.Router();

const Message = require('../models/message');

router.post('/', function(req, res, next) {
    const message = new Message({
        content: req.body.content
    });
    console.log(rec);
    message.save(function(err, result) {
        if (err)
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        res.status(201).json({
            message: 'Saved message',
            obj: result
        });
    });
});

module.exports = router;