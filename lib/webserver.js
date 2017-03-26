"use strict";

var express = require('express');
var templates = require('templates.js');
var editor = require('./editor');

var webserver = {};

webserver.init = function(callback) {
	var app = express();

	app.engine('tpl', templates.__express);
	app.set('view engine', 'tpl');
	app.set('views', 'views');

	app.use(express.static('public'));

	app.get('/editor', function (req, res) {
		editor.getAssets(function(err, assets) {
			res.render('editor', {
				data: JSON.stringify({
					assets: assets
				})
			});
		});
	});

	app.listen(3000, function () {
		console.log('Map editor listening on localhost:3000/editor');
	});

	callback(false);
};

module.exports = webserver;