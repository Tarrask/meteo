/**
 * HomeController
 *
 * @description :: Server-side logic for managing homes
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var moment = require('moment');
moment.locale("fr");
 
module.exports = {
	index: function(req, res, next) {
		
		dataCollector.getLastValues(function(err, values) {
			console.log(values);
			values.moment = moment;
			res.view("index.ejs", values);
		});
	}
};

