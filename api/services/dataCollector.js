
var serialport = require("serialport"),
		exec = require('child_process').exec,
		util = require("util");

module.exports = {
	serialListener: function() {
		var serialPort = new serialport.SerialPort("/dev/ttyUSB0", {
			baudrate: "9600",
			parser: serialport.parsers.readline("\n")
		});
		
		serialPort.on("open", function() {
			sails.log.info("Start listening serial communications.");
			serialPort.on("data", parseAndStoreData);
		});
	},
	
	getTemperature: function(callback) {
		fetchData([4,2], callback);
	},
	getTension: function(callback) {
		fetchData(1, callback);
	},
	getPression: function(callback) {
		fetchData(3, callback);
	},
	getLastValues: function(callback) {
		fetchLastData([1,2,3,4], function(err, data) {
			var result = {
				timestamp: data[0],
				tension: data[1],
				temperature1: data[2],
				pression: data[3]/100,
				temperature2: data[4]
			};
			callback(err, result);
		});
	},
	getLastTemperature: function(callback) {
		fetchLastData([4,2], callback);
	}
}

function fetchLastData(columns, callback) {
	if(!util.isArray(columns)) {
		columns = [columns];
	}
	exec("/usr/bin/rrdtool lastupdate /var/lib/rrd/meteo.rrd",
		function(err, stdout, stderr) {
			var lines = stdout.split("\n");
			var fields = lines[2].split(/[ :]+/);
			var data = [parseInt(fields[0])];
			for(var i = 0; i < columns.length; i++) {
				data.push(parseFloat(fields[columns[i]]));
			}
			callback(err, data);
		});
}

function fetchData(columns, callback) {
	if(!util.isArray(columns)) {
		columns = [columns];
	}

	exec("/usr/bin/rrdtool fetch /var/lib/rrd/meteo.rrd AVERAGE --start end-3d --end now", {maxBuffer: 2000*1024},
		function(err, stdout, stderr) {
			var lines = stdout.split("\n");
			var data = [];
			for(var i = 2, l = lines.length; i<l; i++) {
				var fields = lines[i].split(/[ :]+/);
				data[i] = [parseInt(fields[0])];
				for(var j = 0; j < columns.length; j++) {
					data[i].push(parseFloat(fields[columns[j]]));
				}
			}
			callback(err, data);
		});
}

/**
 * Parse les données fournies par les Arduini et les stocke dans en base de donnée.
 */
function parseAndStoreData(data) {
	sails.log(new Date().toISOString() + ": " + data);
	var fields = data.split(";");
	if(fields.length < 8) { return; };
	
	var data = {
	  timestamp: parseInt(fields[0]),
		//counter: parseInt(fields[1]),
		tension: parseFloat(fields[2]),
		temp1: parseFloat(fields[3]),
		//humidite: parseFloat(fields[4]),
		//temp2: parseFloat(fields[5]),
		pression: parseInt(fields[6]),
		temp3: parseFloat(fields[7])
	}
	
	exec("/usr/bin/rrdtool update /var/lib/rrd/meteo.rrd N:" + data.tension + ":" + data.temp1 + ":" + data.pression + ":" + data.temp3,
		function(err, stdout, stderr) {
			if(err) {
				sails.log.error("Unable to update rrd database:\n", err);
				sails.log.error("Data to import: " + new Date() + ":" + data.tension + ":" + data.temp1 + ":" + data.pression + ":" + data.temp3);
			}
			
			dataCollector.getLastValues(function(err, data) {
				sails.io.emit("dataUpdated", data);
			});
		});
}