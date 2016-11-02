myapp.controller('adminChinhSuaChuyenBay2Ctrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	$scope.chinhSuaChuyenBay = function(){
	  	$http({
	        method: 'PUT',
	        url: '/api/flights/' + Data.flight._id,
	        data:{
			    'maChuyenBay': $scope.maChuyenBay,
			    'noiDi': $scope.noiDi,
			    'noiDen': $scope.noiDen,
			    'ngay': $scope.ngayDi,
			    'gio': $scope.gio + ':' + $scope.phut,
			    'hang': $scope.hang,
			    'soGhe': $scope.soLuongGhe,
			    'giaVe': $scope.giaVe,
			    'token': Data.token
	        }
	    }).then(function successCallback(response) {
	    	console.log('suasanbay success');
	    }, function errorCallback(response) {
	        console.log('suaSanBay failed');

	    });
    }

    $scope.xemTinhTrangDatVe = function(){
    	$location.path('/admin-xem-dat-ve');
    }

    $scope.themChuyenBay = function(){
    	$location.path('/admin-them-chuyen-bay');
    }

	$scope.sanBayDi = [];
	$http({
        method: 'GET',
        url: '/api/start_airports',

    }).then(function successCallback(response) {
        var airports = response.data;
			
        for (var i = 0; i < airports.length; i++) {
            $http({
                method: 'GET',
                url : '/api/airports/' + airports[i]
            }).then(function success(res) {
                $scope.sanBayDi.push(res.data);
                //console.log(res.data);
            })
        }
    }, function errorCallback(response) {
        console.log('laySanBayDi failed');
    });

    $scope.maChuyenBay = Data.flight._ma;
    $scope.noiDi = Data.flight._noiDi;
    $scope.noiDen = Data.flight._noiDen;
    $scope.ngayDi = Data.flight._ngayDi;
    $scope.gio = Data.flight._gioDi.substring(0,1);
    $scope.phut = Data.flight._gioDi.substring(3,4);
    $scope.hang = Data.flight._hang;
    $scope.soLuongGhe = Data.flight._soGhe;
    $scope.giaVe = Data.flight._giaVe;

    // $http({
    //     method: 'POST',
    //     url: '/api/flight3s',
    //     data:{
    //     	'noiDi': Data.flight.noiDi,
    //     	'noiDen': Data.flight.noiDen,
    //         'token': Data.token
    //     }
    // }).then(function successCallback(response) {
    // 	$scope.flights = response.data;
    // }, function errorCallback(response) {
    //     console.log('laySanBay failed');

    // });
}]);