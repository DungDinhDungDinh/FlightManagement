

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
      otherwise({
        redirectTo: '/'
      });
  }]);


myapp.service('Data',function() {
  this.noiDi = '';
  this.noiDen = '';
  this.ngayDi = '';
  this.soNguoi;
  this.maChuyenBay = '';
  this.hang = '';
});

myapp.controller('myCtrl',  ['$scope', '$http', 'Data', '$location', function ($scope, $http, Data, $location) {
 	$scope.number_value1 = ["1", "2", "3", "4", "5", "6"];
	$scope.number_value2 = ["0", "1", "2"];
	$scope.number_value3 = ["0", "1"];
	$scope.danh_xung = ["Ông", "Bà"];

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

        Data.noiDi = $scope.selectedNoidi;
        Data.noiDen = $scope.selectedNoiden;
        Data.ngayDi = $scope.selectedNgaydi.replace(/\//g,"-");
        Data.ngayVe = $scope.selectedNgayve;
        Data.soNguoi = parseInt($scope.selectedNumber1, 10)
                		parseInt($scope.selectedNumber2, 10)
        				  parseInt($scope.selectedNumber3, 10);
  
       $location.path('/chon-chuyen-bay');
   };
   
}]);

myapp.controller('chonChuyenBayCtrl',  ['$scope', '$http', 'Data', '$location', function ($scope, $http, Data, $location) {

	console.log(Data.noiDi);
	console.log(Data.noiDen);
	console.log(Data.ngayDi);
	console.log(Data.soNguoi);

	$scope.timChuyenBay1 = function(noiDi, noiDen, ngayDi, soNguoi) {
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
    };


       $scope.selectedFlight;
       $scope.flight = {};
       $scope.flight.selected = {};
        //Chọn chuyến bay
    $scope.chonChuyenBay = function() {
        angular.forEach($scope.flights, function(selected) {
            if (selected.selected) {
                $scope.selectedFlight = selected;
                      Data.maChuyenBay = $scope.selectedFlight._ma;
        Data.hang = $scope.selectedFlight._hang;;

        $location.path('/nhap-thong-tin-khach');

            }
        });
        console.log($scope.selectedFlight);
  
    };

    $scope.flights = [];
    $scope.timChuyenBay1(Data.noiDi, Data.noiDen, Data.ngayDi, Data.soNguoi);

    //Bien check radio-button
    $scope.checked = false;

}]);


myapp.controller('thongTinKhachHangCtrl',  ['$scope', '$http', 'Data', '$location', function ($scope, $http, Data, $location) {
	
	console.log(Data.hang);

}]);