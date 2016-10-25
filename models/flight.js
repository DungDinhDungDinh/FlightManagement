var mongoose = require('mongoose');

//Flight Schema
var flightSchema = mongoose.Schema({
	_ma:{
		type:String,
		required: true
	},
	_noiDi:{
		type:String,
		required: true,
	},
	_noiDen:{
		type:String,
		required: true
	},
	_ngayDi:{
		type:String,
		required:true
	},
	_gioDi : {
		type :String
	},
	_hang:{
		type:String,
		required:true
	},
	_soGhe:{
		type: Number
	},
	_giaVe:{
		type: Number
	}
});


var Flight = mongoose.model('Flight',flightSchema);

module.exports = Flight;
