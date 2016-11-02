myapp.controller('thongTinChuyenBay1Ctrl',  ['$scope', '$http', 'Data', '$location', 
    '$rootScope', function ($scope, $http, Data, $location, $rootScope) {

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
                url: '/api/start_airports'
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
        $scope.selectedNgaydi = $('#from1').val();
        
        if($scope.selectedNgaydi == "")
        {
            alert('Vui lòng chọn ngày khởi hành!');
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
        var soNguoi = 1;

        Data.soGheDi = 1;     
        Data.khuHoi = false;    
       $scope.timChuyenBay1(noiDi, noiDen, ngayDi, soNguoi, false);
       $location.path('/chon-chuyen-bay');
   };
}]);