myapp.controller('thongTinChuyenBay3Ctrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	 $scope.muaVeTrucTuyen = function () {
        $location.path('/');
    }

    $scope.thongTinChuyenBay = function () {
        $location.path('/thong-tin-chuyen-bay-1');
    }
      $scope.thongTinChuyenBay2 = function () {
        $location.path('/thong-tin-chuyen-bay-2');
    }
     $scope.thongTinChuyenBay3 = function () {
        $location.path('/thong-tin-chuyen-bay-3');
    }

    $scope.timChuyenBay4 = function(maChuyenBay) {
        $http({
                method: 'GET',
                url: '/api/flights',
                params : {
                    'maChuyenBay' : maChuyenBay
                }
            }).then(function successCallback(response) {
                console.log('timChuyenBay4 success');
                console.log(response.data);
                Data.flights = response.data;
                $rootScope.$broadcast("tableDataUpdated", {});
                
            }, function errorCallback(response) {
                console.log('timChuyeBay4 failed');
            });
    } 

    $scope.timChuyenBay = function ()
    {  
        if($scope.maChuyenBay == null) {
            alert('Nhập mã sân bay');
            return;
        }
        Data.soGheDi = 1;     
        Data.khuHoi = false;    
       $scope.timChuyenBay4($scope.maChuyenBay);
       $location.path('/chon-chuyen-bay');
   };
}]);