var mongoose = require('mongoose');

//Flight Schema
//Ten san bay phong TH thanh pho co mo them san bay
var airPortSchema = mongoose.Schema({
	_ma:{
		type:String,
		required: true
	},
	_nhomSanBay:{
		type:String,
		required: true
	},
	_diaDanh:{
		type:String,
		required: true
	},
	_tenSanBay: {
		type:String,
	}
});


var Airport = mongoose.model('Airport',airPortSchema);

module.exports = Airport;