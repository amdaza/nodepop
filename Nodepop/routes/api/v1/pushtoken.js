/**
 * Created by Alicia on 03/05/2016.
 */
"use strict";

var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var PushToken = mongoose.model('Pushtoken');

// Response schema
var apiResponse = require('../../../lib/apiResponse');
// Error schema
var apiError = require('../../../lib/apiError');

// Languages
var langTexts = {
    es: require('../../../lib/languages/lang_ES'),
    en: require('../../../lib/languages/lang_EN')
};

router.post('/', function (req, res, next) {
    var platform = req.body.platform;
    var token = req.body.token;
    var user = req.body.user;

    var data = {};
    if (platform !== undefined){
        data.platform = platform;
    }
    if (token !== undefined) {
        data.token = token;
    }

    var checkUserPromise = new Promise(function (resolve, reject){
        if (user !== undefined){
            // Search user by _id or email
            PushToken.getUserId(user, function (err, row){
                if (err) {
                    reject('User param not valid');
                }
                // Include id user in data
                data.user = row;
                resolve();
            });

        } else{
            // No user, so we're done
            resolve();
        }
    });

    checkUserPromise.then( function (result) {
        var pushToken = new PushToken(data);

        var validateError = pushToken.validateSync();
        if (validateError){
            var err = apiError(
                3, // code
                langTexts[req.lang][1], // message
                validateError.errors, // generated error
                validateError.name // name
            );
            res.status(400);
            return apiResponse(res, false, err);
        }
        pushToken.save(function (err, saved) {
            if (err) { // Unknown error
                var serverError = apiError(
                    500, // code
                    null, // message
                    err, // generated error
                    'ServerError' // name
                );
                res.status(500);
                return apiResponse(res, false, serverError);
            }

            return apiResponse(res, true, saved);
        })

    }).catch (function (err){
        // Error on getting user
        var getUserError = apiError(
            11, // code
            langTexts[req.lang][11], // message
            err, // generated error
            'UnvalidUser' // name
        );
        res.status(400);
        return apiResponse(res, false, getUserError);
    });
});

module.exports = router;