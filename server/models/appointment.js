var mongoose = require('mongoose');

var AppointmentSchema = new mongoose.Schema({
	date: String,
	time: String,
	patient: String,
	complain: String
});

mongoose.model('Appointment', AppointmentSchema);