var sys = require('sys')
var exec = require('child_process').exec;
var Q = require("q");

var lightMappings = [
    '0xF0F0F0F0E1LL',
    '0xF0F0F0F0E2LL',
    '0xF0F0F0F0E3LL',
    '0xF0F0F0F0E4LL'
];

var RETRIES = 10;

function switchLight(id, type) {

    var deferred = Q.defer();

    
    exec("/home/pi/server/onoff " + lightMappings[id - 1] + " " + type, function (error, stdout, stderr) {
        console.log('stdout: ' + stdout);

        setTimeout(function() {
            if (stdout.indexOf('OK') != -1) {
                deferred.resolve('OK');
            }

            deferred.resolve('ERROR');
        }, 300);
    });

    return deferred.promise;    
}

function switchLights(ids, type) {
    var funcs = [];

    ids.forEach(function(id) {
        funcs.push(function() {
            return switchLight(id, type);
        });
    });

    return funcs.reduce(function (soFar, f) {
        return soFar.then(f);
    }, Q());    
}

exports.lightOn = function(req, res) {

    var ids = req.params.id != 'all' ? [req.params.id] : [1, 2, 3, 4];
    switchLights(ids, 'on').then(function(status) {
        res.json({status: status});
    });
};

exports.lightOff = function(req, res) {

    var ids = req.params.id != 'all' ? [req.params.id] : [1, 2, 3, 4];
    switchLights(ids, 'off').then(function(status) {
        res.json({status: status});
    });
};

exports.lightStatus = function(req, res) {
  res.json({status: 'OK'});
};
