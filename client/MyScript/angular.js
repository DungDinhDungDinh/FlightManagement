
var myapp = angular.module('myApp',[]);

myapp.service('Data',function() {
    this.test = 'abce';
});

myapp.controller('myCtrl', function($scope, $http, Data){
	$scope.number_value1 = ["1", "2", "3", "4", "5", "6"];
	$scope.number_value2 = ["0", "1", "2"];
	$scope.number_value3 = ["0", "1"];
	$scope.danh_xung = ["Ông", "Bà"];

    console.log(Data.test);
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
		//$scope.sanBayDen = [selectedNoidi];
		//console.log($scope.sanBayDi);
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

    var timChuyenBay1 = function(noiDi, noiDen, ngayDi, soNguoi) {
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
                $scope.flights = response.data;
                
            }, function errorCallback(response) {
                console.log('timChuyeBay1 failed');
            });
    }

    var timChuyenBay2 = function(noiDi, noiDen, ngayDi) {
    	$http({
                method: 'GET',
                url: '/api/flights',
                params : {
                	'maNoiDi' : noiDi,
                	'maNoiDen' : noiDen,
                	'ngayDi' : ngayDi
                }
            }).then(function successCallback(response) {
                console.log('timChuyenBay2 success');
                console.log(response.data);
                $scope.flights = response.data;
                
            }, function errorCallback(response) {
                console.log('timChuyeBay2 failed');
            });
    }

    var timChuyenBay3 = function(noiDi, noiDen) {
    	$http({
                method: 'GET',
                url: '/api/flights',
                params : {
                	'maNoiDi' : noiDi,
                	'maNoiDen' : noiDen
                }
            }).then(function successCallback(response) {
                console.log('timChuyenBay3 success');
                console.log(response.data);
                $scope.flights = response.data;
                
            }, function errorCallback(response) {
                console.log('timChuyeBay3 failed');
            });
    }

    var timChuyenBay4 = function(maChuyenBay) {
    	$http({
                method: 'GET',
                url: '/api/flights',
                params : {
                	'maChuyenBay' : maChuyenBay
                }
            }).then(function successCallback(response) {
                console.log('timChuyenBay4 success');
                console.log(response.data);
                $scope.flights = response.data;
                
            }, function errorCallback(response) {
                console.log('timChuyeBay4 failed');
            });
    }


    var datCho = function(maChuyenBay, hang, soGheDat, ngayDi,
    						danhXung, ho, ten, dienThoai, quocTich) {
    	$http({
                method: 'POST',
                url: '/api/bookings',
                data : {
                	'maChuyenBay' : maChuyenBay,
                	'hang' : hang,
                	'soGheDat' : soGheDat,
                	'ngayDi' : ngayDi,
                	'danhXung' : danhXung,
                	'ho' : ho,
                	'ten' : ten,
                	'dienThoai' : dienThoai,
                	'quocTich' : quocTich
                }
            }).then(function successCallback(response) {
                console.log('themHanhKhach success');
                console.log(response.data);
                
            }, function errorCallback(response) {
                console.log('themHanhKhach failed');
            });
    }

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
	}

	$scope.checkEx1 = function ()
	{
		$scope.ngaydi = $('#from1').val();		
		console.log($scope.ngaydi);
		if($scope.khoihanh == null)
		{
			alert('Vui lòng chọn khởi hành!');
			return;
		}
		if($scope.ketthuc == null)
		{
			alert('Vui lòng chọn kết thúc!');
			return;
		}	
		
		if($scope.ngaydi == "")
		{
			alert('Vui lòng chọn ngày khởi hành!');
			return;
		}
	}
	
	
	$scope.checkEx2 = function ()
	{		
		if($scope.khoihanh == null)
		{
			alert('Vui lòng chọn khởi hành!');
			return;
		}
		if($scope.ketthuc == null)
		{
			alert('Vui lòng chọn kết thúc!');
			return;
		}	
	}


	$scope.checkEx3 = function ()
	{		
		if($scope.maCB == null)
		{
			alert('Vui lòng nhập mã chuyến bay!');
			return;
		}	
	}
	//datCho('BL327', 'C1', 4, '22-10-2016', 'danhXung', 'ho', 'ten', 'dienThoai', 'quocTich');

	//TEST   
	//$scope.laySanBayDi();
    //console.log($scope.sanBayDi);
     //  var sbdi = 'SGN';
     // laySanBayDen(sbdi);
     // console.log($scope.sanBayDen);
    // timChuyenBay1('SGN', 'BMT', '22-10-2016', 4);
    // console.log($scope.flights);
    // timChuyenBay2('SGN', 'BMT', '22-10-2016');
    // console.log($scope.flights);
    // timChuyenBay3('SGN', 'BMT');
    // console.log($scope.flights);
    // timChuyenBay4('BL327');
    // console.log($scope.flights);

    //themHanhKhach('ABCXYZ', 'Ong', 'Dang', 'ThanhDanh', '1234',  'Viet Nam');

    
        $scope.addNew = function(personalDetail){
        	//
        };
    };    
});



    
	
