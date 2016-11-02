myapp.controller('adminXemDatVeCtrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	$scope.chinhSuaChuyenBay = function(){
    	$location.path('/admin-chinh-sua-chuyen-bay-1');
    }

    $scope.themChuyenBay= function(){
    	$location.path('/admin-them-chuyen-bay');
    }
}]);