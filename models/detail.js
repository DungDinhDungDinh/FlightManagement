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
	},
	_mucGia:{
		type: String,
		required: true
	}
});


var FlightDetail = mongoose.model('FlightDetail',flightDetailSchema);

module.exports = FlightDetail;
