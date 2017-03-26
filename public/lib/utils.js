"use strict";

(function (module) {
	var utils = {};
	var fs;

	if (typeof window === 'undefined') {
		fs = require('fs');
	}

	// Adapted from http://stackoverflow.com/questions/5827612/node-js-fs-readdir-recursive-directory-search
	utils.walk = function (dir, done) {
		var results = [];

		fs.readdir(dir, function (err, list) {
			if (err) {
				return done(err);
			}
			var pending = list.length;
			if (!pending) {
				return done(null, results);
			}
			list.forEach(function (file) {
				file = dir + '/' + file;
				fs.stat(file, function (err, stat) {
					if (err) {
						return done(err);
					}

					if (stat && stat.isDirectory()) {
						utils.walk(file, function (err, res) {
							if (err) {
								return done(err);
							}

							results = results.concat(res);
							pending -= 1;
							if (!pending) {
								done(null, results);
							}
						});
					} else {
						results.push(file);
						pending -= 1;
						if (!pending) {
							done(null, results);
						}
					}
				});
			});
		});
	};
	

	module.exports = utils;
	if (typeof window !== 'undefined') {
		window.utils = module.exports;
	}

}(typeof module === 'undefined' ? {
	module: {
		exports: {},
	},
} : module));