var mongoose = require('mongoose');
var Appointment = mongoose.model('Appointment');

module.exports = (function() {
	return{
		show: function(request, response) {
			Appointment.find({}, function(err, results) {
				if(err) {
					console.log(err);
				}
				else{
					response.json(results);
				}
			});
		},
		add: function(request, response) {
			Appointment.count({date: request.body.date}, function(err, count){
				console.log( "Number of appointments:", count );
				if(count >= 3){
					response.json({error: "Already three appointments on this day!"});
				}
				else{
					Appointment.count({date: request.body.date, patient: request.body.patient}, function(err, count){
						if(count >= 1){
							response.json({error: "You already have an appointment on this date!"});
						}
						else{
							var appointment = new Appointment({date: request.body.date, time: request.body.time, patient: request.body.patient, complain: request.body.complain});
							appointment.save(appointment);
						}
					});
				}
			});
			
		},
		remove: function(request, response) {
			console.log(request.body);
			Appointment.remove({_id: request.body._id}, function(err){
		    	if(err){
			        console.log("something went wrong");
			    } else {
			    	response.redirect('/');
			    }
		    })
		}
	}
})();