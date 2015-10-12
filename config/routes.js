var appointments = require('./../server/controllers/appointments.js');

module.exports = function(app) {

	app.get('/getAppointments', function(request, response){
		appointments.show(request, response);
	});

	app.post('/addAppointment', function(request, response){
		appointments.add(request, response);
	});

	app.post('/removeAppointment', function(request, response){
		appointments.remove(request, response);
	});
}