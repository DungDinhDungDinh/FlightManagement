

var myapp = angular.module('myApp',['ngRoute']);

myapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: './home.html',
        controller: 'myCtrl'
      }).
      when('/chon-chuyen-bay', {
        templateUrl: './chon-chuyen-bay.html',
        controller: 'chonChuyenBayCtrl'
      }).
      when('/nhap-thong-tin-khach', {
        templateUrl: './nhap-thong-tin-khach.html',
        controller: 'thongTinKhachHangCtrl'
      }).
      when('/thong-tin-chuyen-bay1', {
        templateUrl: './thong-tin-chuyen-bay.html',
        controller: 'thongTinChuyenBay1Ctrl'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);


myapp.service('Data',function() {
  this.flights = [];
  this.backFlights = [];
  this.soGheDi;
  this.khuHoi = false;
  this.selectedFlight = {};
  this.selectedBackFlight = {};
});

myapp.controller('myCtrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
 	$scope.number_value1 = ["1", "2", "3", "4", "5", "6"];
	$scope.number_value2 = ["0", "1", "2"];
	$scope.number_value3 = ["0", "1"];

    $scope.noiDi = '';
    $scope.noiDen = '';
    $scope.ngayDi = '';
    $scope.ngayVe = '';
    $scope.soNguoi = '';

	$scope.chieu1 = function() 
    {
		 $scope.style1 = {backgroundColor: '#337ab7'};
		 $scope.style2 = null;
		 $scope.show = false;
	}
	
	$scope.chieu2 = function() 
    {
		 $scope.style2 = {backgroundColor: '#337ab7'};
		 $scope.style1 = null;
		 $scope.show = true;
	}
	
	$scope.checkNumber1 = function(selectedNumber1)
	{
		$scope.selectedNumber2 = $scope.number_value2[0];
		$scope.selectedNumber3 = $scope.number_value3[0];	
		if(selectedNumber1 == "1")
		{	
			$scope.number_value2 = ["0", "1", "2"];
			$scope.number_value3 = ["0", "1"];
		}
		if(selectedNumber1 == "2")
		{
			$scope.number_value2 = ["0", "1", "2", "3", "4"];
			$scope.number_value3 = ["0", "1", "2"];
		}
		if(selectedNumber1 == "3")
		{
			$scope.number_value2 = ["0", "1", "2", "3"];
			$scope.number_value3 = ["0", "1", "2", "3"];
		}

		if(selectedNumber1 == "4")
		{
			$scope.number_value2 = ["0", "1", "2"];
			$scope.number_value3 = ["0", "1", "2", "3", "4"];
		}
		
		if(selectedNumber1 == "5")
		{
			$scope.number_value2 = ["0", "1"];
			$scope.number_value3 = ["0", "1", "2", "3", "4", "5"];
		}
		
		if(selectedNumber1 == "6")
		{
			$scope.number_value2 = ["0"];
			$scope.number_value3 = ["0", "1", "2", "3", "4", "5", "6"];
		}
	}
	
	$scope.checkNumber2 = function(selectedNumber2)
	{
		$scope.selectedNumber3 = $scope.number_value3[0];	
		if($scope.selectedNumber1 == "1")
		{	
			$scope.number_value3 = ["0", "1"];
			if(selectedNumber2 == "2")
				$scope.number_value3 = ["0"];
		}
		
		if($scope.selectedNumber1 == "2")
		{		
			$scope.number_value3 = ["0", "1", "2"];
			if(selectedNumber2 == "3")
				$scope.number_value3 = ["0", "1"];
			if(selectedNumber2 == "4")
				$scope.number_value3 = ["0"];		
		}
		
		if($scope.selectedNumber1 == "3")
		{		
			$scope.number_value3 = ["0", "1", "2", "3"];
		}
		
		if($scope.selectedNumber1 == "4")
		{		
			$scope.number_value3 = ["0", "1", "2", "3", "4"];
		}
		
		if($scope.selectedNumber1 == "5")
		{		
			$scope.number_value3 = ["0", "1", "2", "3", "4", "5"];
		}
		
		if($scope.selectedNumber1 == "6")
		{		
			$scope.number_value3 = ["0", "1", "2", "3", "4", "5", "6"];
		}
	}

	$scope.sanBayDi1 = [];
	$scope.sanBayDi = [];
    $scope.sanBayDen = [];
    $scope.flights = [];

    $scope.chonNoiDi = function(selectedNoidi)
	{
		$scope.sanBayDen = [];
		laySanBayDen(selectedNoidi);
	}

    $scope.laySanBayDi = function() {
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


   var laySanBayDen = function(noiDi) {
         $http({
                method: 'GET',
                url: '/api/dest_airports',
                params : {ma : noiDi}
            }).then(function successCallback(response) {
                console.log('laySanBayDen success');
                console.log(response.data);
                var airports = response.data;
                for (var i = 0; i < airports.length; i++) {
                    console.log(airports[i]);
                    $http({
                        method: 'GET',
                        url : '/api/airports/' + airports[i]
                    }).then(function success(res) {
                        $scope.sanBayDen.push(res.data);
                        console.log(res.data);
                    })
                }
            }, function errorCallback(response) {
                console.log('laySanBayDen failed');
            });
    };


    $scope.timChuyenBay1 = function(noiDi, noiDen, ngayDi, soNguoi, khuHoi) {
    	$http({
                method: 'GET',
                url: '/api/flights',
                params : {
                	'maNoiDi' : noiDi,
                	'maNoiDen' : noiDen,
                	'ngayDi' : ngayDi,
                	'soNguoi' : soNguoi
                }
            }).then(function successCallback(response) {
                console.log('timChuyenBay1 success');
                console.log(response.data);
                if (!khuHoi)
                {
                	Data.flights = response.data;
                } else {
                	Data.backFlights = response.data;
                }
                
                $rootScope.$broadcast("tableDataUpdated", {});
                
            }, function errorCallback(response) {
                console.log('timChuyeBay1 failed');
            });
    };

    $scope.timChuyenBay = function ()
	{
		$scope.selectedNgaydi = $('#from').val();
		$scope.selectedNgayve = $('#to').val();
		
		if($scope.selectedNgaydi == "")
		{
			alert('Vui lòng chọn ngày khởi hành!');
			return;
		}		
		if($scope.selectedNgaydve == "" && $scope.show == true)
		{
			alert('Vui lòng chọn ngày về !');
			return;
		}	
		if($scope.selectedNoidi == null)
		{
			alert('Vui lòng chọn khởi hành!');
			return;
		}
		if($scope.selectedNoiden == null)
		{
			alert('Vui lòng chọn kết thúc!');
			return;
		}	

        var noiDi = $scope.selectedNoidi;
        var noiDen = $scope.selectedNoiden;
        var ngayDi = $scope.selectedNgaydi.replace(/\//g,"-");
        var ngayVe = $scope.selectedNgayve;
        var soNguoi = parseInt($scope.selectedNumber1, 10)
                		parseInt($scope.selectedNumber2, 10)
        				  parseInt($scope.selectedNumber3, 10);


        Data.soGheDi = soNguoi;		
        Data.khuHoi = $scope.show;	  
       $scope.timChuyenBay1(noiDi, noiDen, ngayDi, soNguoi, false);
       if ($scope.show == true) {
       	 $scope.timChuyenBay1(noiDen, noiDi, ngayVe, soNguoi, true);
       }
       $location.path('/chon-chuyen-bay');
   };

  	$scope.muaVeTrucTuyen = function () {
  		$location.path('/');
  	}

  	$scope.thongtinChuyenBay = function () {
  		$location.path('/thong-tin-chuyen-bay1');
  	}
   
}]);

myapp.controller('chonChuyenBayCtrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location,  $rootScope) {
		
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

}]);


myapp.controller('thongTinKhachHangCtrl',  ['$scope', '$http', 'Data', '$location', function ($scope, $http, Data, $location) {

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

myapp.controller('thongTinChuyenBay1Ctrl',  ['$scope', '$http', 'Data', '$location', function ($scope, $http, Data, $location) {
	
}]);

myapp.controller('thongTinChuyenBay2Ctrl',  ['$scope', '$http', 'Data', '$location', function ($scope, $http, Data, $location) {
	
}]);

myapp.controller('thongTinChuyenBay3Ctrl',  ['$scope', '$http', 'Data', '$location', function ($scope, $http, Data, $location) {
	
}]);