var mongoose = require('mongoose');

//FlightDetail Schema
var flightDetailSchema = mongoose.Schema({
	_maDatCho:{
		type:String,
		required: true
	},
	_maChuyenBay:{
		type:String,
		required: true,
	},
	_ngay:{
		type:String,
		required: true
	},
	_hang:{
		type:String,
	}
});


var FlightDetail = mongoose.model('FlightDetail',flightDetailSchema);

module.exports = FlightDetail;
