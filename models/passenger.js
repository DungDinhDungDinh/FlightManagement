var mongoose = require('mongoose');

//Passenger Schema
var passengerSchema = mongoose.Schema({
	_maDatCho:{
		type:String
	},
	_danhXung:{
		type:String
	},
	_ho:{
		type:String,
	},
	_ten:{
		type:String,
	}
});


var Passenger = mongoose.model('Passenger',passengerSchema);

module.exports = Passenger;
