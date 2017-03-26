"use strict";

var utils = require('../public/lib/utils');
var editor = {};

editor.getAssets = function(callback) {
	utils.walk('./public/assets', function(err, assets) {
		assets = assets.map(function(asset) { return asset.replace('./public', ''); });
		callback(err, assets);
	});
};

module.exports = editor;