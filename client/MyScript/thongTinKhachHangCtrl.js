myapp.controller('thongTinKhachHangCtrl',  ['$scope', '$http', 'Data', '$location', function ($scope, $http, Data, $location) {

     $scope.muaVeTrucTuyen = function () {
        $location.path('/');
    }

    $scope.thongTinChuyenBay = function () {
        $location.path('/thong-tin-chuyen-bay-1');
    }

	console.log(Data.selectedFlight);
	console.log(Data.selectedBackFlight);
	$scope.danh_xung = ["Ông", "Bà"];
	$scope.selectedDX = '';
	$scope.khachHang = null;
	$scope.selectedFlight = Data.selectedFlight;
	$scope.selectedBackFlight = Data.selectedBackFlight;
	

	$scope.datCho = function(khuHoi,
							maChuyenBayDi, hangDi, soGheDat, ngayDi,
							maChuyenBayVe, hangVe, ngayVe,
    						danhXung, ho, ten, dienThoai, quocTich) {
    	$http({
                method: 'POST',
                url: '/api/bookings',
                data : {
                	'khuHoi' : khuHoi,
                	'maChuyenBayDi' : maChuyenBayDi,
                	'hangDi' : hangDi,
                	'soGheDat' : soGheDat,
                	'ngayDi' : ngayDi,
                	'maChuyenBayVe' : maChuyenBayVe,
                	'hangVe' : hangVe,
                	'ngayVe' : ngayVe,
                	'danhXung' : danhXung,
                	'ho' : ho,
                	'ten' : ten,
                	'dienThoai' : dienThoai,
                	'quocTich' : quocTich
                }
            }).then(function successCallback(response) {
                alert('Đặt chỗ thành công'
                	+'\nMã đặt chỗ: ' + response.data.data._maDatCho
                	+'\nNgày đi: ' + $scope.selectedFlight._ngayDi
                	+'\nGiờ đi: ' + $scope.selectedFlight._gioDi
                	+'\nKhách hàng đại diện: ' +' ' + $scope.khachHang.danhXung +' ' + $scope.khachHang.ho +' ' + $scope.khachHang.ten
                	+'\nTổng tiền:' + response.data.data._tongTien);
                
            }, function errorCallback(response) {
                alert('Đặt chỗ thất bại, vui lòng thử lại !');
            });
    }

    $scope.hoanTatDatCho = function() {
    	$scope.datCho(Data.khuHoi,
    		$scope.selectedFlight._ma, $scope.selectedFlight._hang, Data.soGheDi, $scope.selectedFlight._ngayDi,
    		$scope.selectedBackFlight._ma, $scope.selectedBackFlight._hang, $scope.selectedBackFlight._ngayDi,
    		$scope.khachHang.danhXung, $scope.khachHang.ho, $scope.khachHang.ten, $scope.khachHang.dienThoai, $scope.khachHang.quocTich);
		

		$location.path('/');


	};
}]);