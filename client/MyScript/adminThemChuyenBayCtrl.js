myapp.controller('adminThemChuyenBayCtrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	 $scope.init = function(){
		$scope.maChuyenBay = "";
		$scope.noiDi = "";
		$scope.noiDen = "";
		$scope.ngayDi = "";
		$scope.gioDi = "";
		$scope.gio = "";
		$scope.phut = "";
		$scope.hang = "";
		$scope.soLuongGhe = 0;
		$scope.giaVe = 0;

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
	};

	$scope.themChuyenBay = function() {
		$scope.ngayDi = $("#from").val();
		if($scope.maChuyenBay == "")
		{
			alert('Vui lòng nhập mã chuyến bay!');
				return;
		}	

		if($scope.noiDi == "")
		{
			alert('Vui lòng chọn nơi khởi hành!');
			return;
		}

		if($scope.noiDen == "")
		{
			alert('Vui lòng chọn nơi về!');
			return;
		}	

		if($scope.ngayDi == "")
		{
			alert('Vui lòng chọn ngày khởi hành!');
			return;
		}	

		if($scope.gio == "")
		{
			alert('Vui lòng chọn giờ đi!');
			return;
		}

		if($scope.phut == "")
		{
			alert('Vui lòng chọn phút!');
			return;
		}

		if($scope.hang == "")
		{
			alert('Vui lòng chọn hạng!');
			return;
		}

		console.log($scope.maChuyenBay);
		console.log($scope.noiDi);
		console.log($scope.noiDen);
		console.log($scope.ngayDi);
		console.log($scope.gio);
		console.log($scope.phut);
		console.log($scope.hang);
		console.log($scope.soLuongGhe);	
		console.log($scope.giaVe);

		console.log('gio',$scope.gio + ":" + $scope.phut);
		console.log($scope.ngayDi);

    	$http({
                method: 'POST',
                url: '/api/flights',
                data : {
                	'maChuyenBay': $scope.maChuyenBay,
                	'noiDi': $scope.noiDi,
                	'noiDen': $scope.noiDen,
                	'ngayDi': $scope.ngayDi.replace(/\//g,"-"),
                	'gioDi': $scope.gio + ":" + $scope.phut,
                	'hang': $scope.hang,
                	'soLuongGhe': $scope.soLuongGhe,
                	'giaVe': $scope.giaVe,
                	'token': Data.token
                }
            }).then(function successCallback(response) {
                console.log('adding success');
                console.log(response.data);
                $scope.flights = response.data;
                alert('Thêm chuyến bay thành công!!');
                $scope.init();
                
            }, function errorCallback(response) {
                console.log('adding failed');
                alert('Thêm chuyến bay thất bại!!');
            });
    };

    $scope.chinhSuaChuyenBay = function(){
    	$location.path('/admin-chinh-sua-chuyen-bay-1');
    }

    $scope.xemTinhTrangDatVe = function(){
    	$location.path('/admin-xem-dat-ve');
    }

    $scope.init();
}]);