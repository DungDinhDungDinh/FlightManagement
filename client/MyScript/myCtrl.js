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

  	$scope.thongTinChuyenBay = function () {
  		$location.path('/thong-tin-chuyen-bay-1');
  	}
   
}]);