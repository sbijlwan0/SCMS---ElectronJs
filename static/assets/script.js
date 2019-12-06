var app =angular.module("Demo",["ngRoute"])
                .config(function($routeProvider)
				{
				$routeProvider
                .when("/home",{
	               templateUrl:"index.html",
	               
})				
 .when("/addhoteldetails",{
	               templateUrl:"addhotel.html",
	              
})				

 .when("/viewhoteldetails",{
	               templateUrl:"view_booking.html",
	             
})				


.when("/edithoteldetails",{
	               templateUrl:"edit_booking.html",
	                
})				
				})
				