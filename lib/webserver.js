"use strict";

var express = require('express');
var app = express();
var templates = require('templates.js');

var webserver = {};

webserver.init = function(callback) {
	app.engine('tpl', templates.__express);
	app.set('view engine', 'tpl');
	app.set('views', 'views');

	app.use(express.static('public'));

	app.get('/editor', function (req, res) {
		res.render('editor', {});
	})

	app.listen(3000, function () {
		console.log('Map editor listening on localhost:3000/editor');
	});

	callback(false);
};

module.exports = webserver;