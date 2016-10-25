var mongoose = require('mongoose');

//Booking Schema
var bookingSchema = mongoose.Schema({
	_maDatCho:{
		type:Number,
		required: true
	},
	_thoiGianDatCho:{
		type:String,
	},
	_tongTien:{
		type:Number,
	},
	_trangThai:{
		type:Number,
	}
});


var Booking = mongoose.model('Booking',bookingSchema);

module.exports = Booking;
