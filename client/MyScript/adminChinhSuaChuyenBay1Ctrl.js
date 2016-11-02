myapp.controller('adminChinhSuaChuyenBay1Ctrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	$scope.chinhSuaChuyenBay = function(){
    	
    }

    $scope.xemTinhTrangDatVe = function(){
    	$location.path('/admin-xem-dat-ve');
    }

    $scope.themChuyenBay = function(){
    	$location.path('/admin-them-chuyen-bay');
    }

    $scope.flights=[];

    //console.log('Data.token',Data.token);




	$http({
        method: 'GET',
        url: '/api/flightss',
        params : {
        	'token': Data.token
        }
    }).then(function successCallback(response) {
        $scope.flights = response.data;
        
    }, function errorCallback(response) {
        console.log('getting failed');
    });


    $scope.flight = {};
    $scope.flight.selectedE = {};
    $scope.flight.selectedD = {};


    $scope.Edit = function(flight){
    	Data.flight = flight;
    	console.log(Data.flight);
    	$location.path('/admin-chinh-sua-chuyen-bay-2');
    };

    $scope.Delete = function(flight){
        Data.flight = flight;
    	$http({
	        method: 'DELETE',
	        url: '/api/flights/' + Data.flight._id,
	        params:{
			    'token': Data.token
	        }
	    }).then(function successCallback(response) {
            $scope.flights = response.data;
	    }, function errorCallback(response) {
	        console.log('XOASanBay failed');

	    });
    };
}]);