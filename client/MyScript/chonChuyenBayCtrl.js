myapp.controller('chonChuyenBayCtrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location,  $rootScope) {

     $scope.muaVeTrucTuyen = function () {
        $location.path('/');
    }

    $scope.thongTinChuyenBay = function () {
        $location.path('/thong-tin-chuyen-bay-1');
    }
		
	$rootScope.$on("tableDataUpdated", function (args) {
		$scope.flights = Data.flights;
		$scope.backFlights = Data.backFlights;
	});
		$scope.khuHoi = Data.khuHoi;
       	$scope.selectedFlight = null;;
       	$scope.selectedBackFlight = null;;
       	$scope.flight = {};
       	$scope.flight.selected = {};
	   
        //Chọn chuyến bay
    $scope.chonChuyenBay = function() {
        angular.forEach($scope.flights, function(selected) {
            if (selected.selected) {
                $scope.selectedFlight = selected;
                Data.selectedFlight = $scope.selectedFlight;
        
            }
        });
        angular.forEach($scope.backFlights, function(selected) {
            if (selected.selected) {
                $scope.selectedBackFlight = selected;
                Data.selectedBackFlight = $scope.selectedBackFlight;
        
            }
        });
		     if (!Data.khuHoi) {
        	if ($scope.selectedFlight != null) {
        		$location.path('/nhap-thong-tin-khach');
        	} else {
        		alert('Vui lòng chọn chuyến bay');
        	}
        } else {
        	if ($scope.selectedFlight != null
        		&& $scope.selectedBackFlight != null) {
        		$location.path('/nhap-thong-tin-khach');
        	} else {
        		alert('Vui lòng chọn chuyến bay');
        	}
        }
        
    };
	
	$scope.setSelected = function(flight){
		console.log(flight._hang);
		console.log(flight.selected);
		$scope.idSelectedHang = flight._hang;
	}
		
   

}]);