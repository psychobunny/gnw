"use strict";

var webserver = require('./lib/webserver');
var async = require('async');

async.series([
	webserver.init
], function() {
	console.log('GNW Ready');
});