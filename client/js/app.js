var appointmentApp = angular.module('appointmentApp', ['ngRoute']);

	appointmentApp.config(function($routeProvider) {
		$routeProvider
			.when('/',{
				templateUrl: 'partials/home.html'
			})
			.when('/addAppointment',{
				templateUrl: 'partials/addAppointment.html'
			})
			.otherwise({
				redirectTo: '/'
			});
	});

appointmentApp.factory('appointmentsFactory', function($http) {
	var factory = {};
	var appointments = [];

	factory.getAppointments = function(callback) {
		$http.get('/getAppointments').success(function(output) {
			appointments = output;
			callback(appointments);
		});
	}

	factory.addAppointment = function(info, callback) {
		$http.post('/addAppointment', info).success(function(output) {
			console.log(output);
			if('error' in output){
				alert(output.error);
			}
			callback(appointments);
		});
	}

	factory.removeAppointment = function(info, callback) {
		$http.post('/removeAppointment', info).success(function(output) {
			callback(appointments);
		});
	}

	var currentUser = prompt("Enter your name");	

	factory.getCurrentUser = function(callback) {
		callback(currentUser);
	}

	return factory;
})

appointmentApp.controller('appointmentsController', function($scope, appointmentsFactory) {

	$scope.date = new Date();

	$scope.futureAppointments = function (object) {
        var currentDate = new Date();
        var appointmentDate = new Date(object.date);
        return appointmentDate >= currentDate;
    };

	appointmentsFactory.getCurrentUser(function(data) {
		$scope.currentUser = data;
	});

	appointmentsFactory.getAppointments(function(data) {
		$scope.appointments = data;
	});

	$scope.addAppointment = function() {
		$scope.newAppointment.patient = $scope.currentUser;
		appointmentsFactory.addAppointment($scope.newAppointment, function() {
			appointmentsFactory.getAppointments(function(data) {
				$scope.appointments = data;
			});
			$scope.newAppointment = {};
	    });    
	}

	$scope.removeAppointment = function(appointment) {
       	var appointmentDate = new Date(appointment.date);
       	var time_diff = Math.round((appointmentDate.getTime() - $scope.date.getTime())/(1000*60*60*24));
       	if(time_diff > 1){
       		appointmentsFactory.removeAppointment(appointment, function() {
				appointmentsFactory.getAppointments(function(data) {
					$scope.appointments = data;
				});
	    	});
       	}
       	else{
       		alert("You can only cancel at least 1 day before the appointment schedule");
       	}
	}
});