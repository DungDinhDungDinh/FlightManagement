myapp.controller('adminXemDatVeCtrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	$scope.chinhSuaChuyenBay = function(){
    	$location.path('/admin-chinh-sua-chuyen-bay-1');
    }

    $scope.themChuyenBay= function(){
    	$location.path('/admin-them-chuyen-bay');
    }

    $http({
        method: 'GET',
        url: '/api/bookings',
        params : {
        	'token': Data.token
        }
    }).then(function successCallback(response) {
        $scope.flights = response.data;
        
    }, function errorCallback(response) {
        console.log('getting failed');
    });
}]);