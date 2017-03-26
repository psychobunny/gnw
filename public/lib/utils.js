"use strict";

(function (module) {
	var utils = {};
	var fs;

	if (typeof window === 'undefined') {
		fs = require('fs');
	}

	utils.invalidLatinChars = /[^\w\s\d\-_]/g;
	utils.trimRegex = /^\s+|\s+$/g;
	utils.collapseWhitespace = /\s+/g;
	utils.collapseDash = /-+/g;
	utils.trimTrailingDash = /-$/g;
	utils.trimLeadingDash = /^-/g;
	utils.isLatin = /^[\w\d\s.,\-@]+$/;
	utils.languageKeyRegex = /\[\[[\w]+:.+\]\]/;
	
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
	
	// http://dense13.com/blog/2009/05/03/converting-string-to-slug-javascript/
	utils.slugify = function (str, preserveCase) {
		if (!str) {
			return '';
		}
		str = str.replace(utils.trimRegex, '');
		str = str.replace(utils.invalidLatinChars, '-');
		
		str = !preserveCase ? str.toLocaleLowerCase() : str;
		str = str.replace(utils.collapseWhitespace, '-');
		str = str.replace(utils.collapseDash, '-');
		str = str.replace(utils.trimTrailingDash, '');
		str = str.replace(utils.trimLeadingDash, '');
		return str;
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