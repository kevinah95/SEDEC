var jwt = require('jwt-simple');
var moment = require('moment');
var bcrypt = require('bcryptjs');
var tokenSecret = process.env.tokenSecret || 'S3D3C';

var exports = module.exports = {};

exports.tokenSecret = tokenSecret;
exports.createToken = function(user) {
    var payload = {
        exp: moment().add(14, 'days').unix(),
        iat: moment().unix(),
        sub: user.userId
    };
    return jwt.encode(payload, tokenSecret);
}