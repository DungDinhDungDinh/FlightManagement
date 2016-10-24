



angular.module('myApp',[]).controller('myCtrl', function($scope, $http){
	$scope.number_value1 = ["1", "2", "3", "4", "5", "6"];
	$scope.number_value2 = ["0", "1", "2"];
	$scope.number_value3 = ["0", "1"];
	$scope.danh_xung = ["Ông", "Bà"];
	
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

	 $scope.sanBayDi = [];
    $scope.sanBayDen = [];
    $scope.flights = [];

    var laySanBayDi = function() {
         $http({
                method: 'GET',
                url: '/api/start_airports',
            }).then(function successCallback(response) {
                var airports = response.data;
                for (var i = 0; i < airports.length; i++) {
                    console.log(airports[i]._noiDi);
                    $http({
                        method: 'GET',
                        url : '/api/airports/' + airports[i]._noiDi
                    }).then(function success(res) {
                        $scope.sanBayDi.push(res.data);
                        console.log(res.data);
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
                    console.log(airports[i]._noiDen);
                    $http({
                        method: 'GET',
                        url : '/api/airports/' + airports[i]._noiDen
                    }).then(function success(res) {
                        $scope.sanBayDen.push(res.data);
                        console.log(res.data);
                    })
                }
            }, function errorCallback(response) {
                console.log('laySanBayDen failed');
            });
    };

    var timChuyenBay = function(noiDi, noiDen, ngayDi, soNguoi) {
    	$http({
                method: 'POST',
                url: '/api/flights',
                body : {
                	'noiDi' : noiDi,
                	'noiDen' : noiDen,
                	'ngayDi' : ngayDi,
                	'soNguoi' : soNguoi
                }
            }).then(function successCallback(response) {
                console.log('timChuyenBay success');
                console.log(response.data);
                $scope.flights = response.data;
                
            }, function errorCallback(response) {
                console.log('timChuyeBay failed');
            });
    }

    var themHanhKhach = function(maDatCho, danhXung, ho, ten, dienThoai, quocTich) {
    	$http({
                method: 'POST',
                url: '/api/passengers',
                body : {
                	'maDatCho' : maDatCho,
                	'danhXung' : danhXung,
                	'ho' : ho,
                	'ten' : ten,
                	'dienThoai' : dienThoai,
                	'quocTich' : quocTich
                }
            }).then(function successCallback(response) {
                console.log('success');
                console.log(response.data);
                
            }, function errorCallback(response) {
                console.log('failed');
            });
    }


   
    laySanBayDi();
    var sbdi = 'SGN';
    laySanBayDen(sbdi);
    timChuyenBay('SGN', 'BMT', '24-10-2016', 4);


	
});



    
	
