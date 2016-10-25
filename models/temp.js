var mongoose = require('mongoose');

var tempSchema = mongoose.Schema({
	noiDi:{
		type:String
	},
	noiDen:{
		type:String
	},
	ngayDi:{
		type:String,
	},
	soLuong: {
		type:String,
	},
	maChuyenBay : {
		type:String,
	},
	hang : {
		type : String,
	}

});


var Airport = mongoose.model('Airport',tempSchema);

module.exports = Airport;