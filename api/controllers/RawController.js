/**
 * RawController
 *
 * @description :: Server-side logic for managing raws
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	"temperature.csv": function(req, res, next) {
		dataCollector.getTemperature(function(err, data) {
			var csv = "timestamp,temperature\n";
			for(var i = 0, l = data.length; i<l; i++) {
				if(data[i] && !isNaN(data[i][0])) {
					 
					csv += data[i][0] + "," + (isNaN(data[i][1])?"":data[i][1]) + "\n";
				}
			}
			res.set('Content-Type', 'text/csv');
			res.send(csv);
		});
	},
	"tension.csv": function(req, res, next) {
		dataCollector.getTension(function(err, data) {
			var csv = "timestamp,tension\n";
			for(var i = 0, l = data.length; i<l; i++) {
				if(data[i] && !isNaN(data[i][0])) {
					csv += data[i][0] + "," + (isNaN(data[i][1])?"":data[i][1]) + "\n";
				}
			}
			res.set("Content-Type", "text/csv");
			res.send(csv);
		});
	},
	"pression.csv": function(req, res, next) {
		dataCollector.getPression(function(err, data) {
			var csv = "timestamp,pression\n";
			for(var i = 0, l = data.length; i<l; i++) {
				if(data[i] && !isNaN(data[i][0])) {
					csv += data[i][0] + "," + (isNaN(data[i][1])?"":data[i][1]/100) + "\n";
				}
			}
			res.set("Content-Type", "text/csv");
			res.send(csv);
		});
	},
};

