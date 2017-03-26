"use strict";

var $ = require('jquery');
var fabric = require('fabric').fabric;
var canvas = {};

canvas.init = function() {
	buildCanvas();
	recenterCanvas();

	$(window).on('resize', recenterCanvas);
};


function buildCanvas() {
	canvas.canvas = new fabric.Canvas('canvas');
}

function recenterCanvas() {
	var slen = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
	canvas.canvas.setHeight(slen);
	canvas.canvas.setWidth(slen);
}

module.exports = canvas;