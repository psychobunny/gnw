"use strict";

var async = require('async');
var $ = require('jquery');
var utils = require('../utils');
var canvas = require('../canvas');
var ui = {};

ui.init = function() {
	async.series([
		preloadImages, setupSelector
	], function(err) {

	})
};

function preloadImages(callback) {
	
	async.each(data.assets, function(asset, next) {
		var el = $('<img />');
		el.attr('src', asset);
		el.addClass('preload');
		el.attr('id', 'preloaded-' + utils.slugify(asset));

		$('body').append(el);
		el.on('load', next);
	}, function(err) {
		console.log('Images pre-loaded');
		callback();
	});
}

function setupSelector(callback) {
	
	var selectorImage = document.getElementById('preloaded-' + utils.slugify(data.assets[0]));
	var selector = new fabric.Image(selectorImage, {
		right: 100,
		top: 100,
	});

	canvas.canvas.add(selector);
	selector.on('click', function() {
		alert('derp');
	});

	callback();
}

module.exports = ui;