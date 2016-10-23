angular.module('flightManagementApp', [])
    .controller('FlightManagementController', function($scope, $http) {
    $scope.sanBayDi = [];
    $scope.sanBayDen = [];

    var laySanBayDi = function() {
         $http({
                method: 'GET',
                url: '/api/start_airports/',
            }).then(function successCallback(response) {
                airports = response.data;
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

            console.log($scope.sanBayDi);
    };

    var laySanBayDen = function(noiDi) {
         $http({
                method: 'GET',
                url: '/api/dest_airports/',
                params : {id : noiDi}
            }).then(function successCallback(response) {
                console.log('success');
                console.log(response.data);
                airports = response.data;
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
                console.log('failed');

            });

            console.log($scope.sanBayDen);
    };

    laySanBayDen('SGN');


    $scope.init = function (){
        //Ham lay danh sach cac chuyen bay -> $scope.flights
        // $http({
        //     method: 'GET',
        //     url: '/api/flights'
        // }).then(function successCallback(response) {
        //     $scope.flights = response.data;
        //     console.log($scope.flights);
        // }, function errorCallback(response) {
        // });

        $http({
                method: 'GET',
                data: $scope._maChuyenBay,
                url: '/api/des_airports/' + $student._maChuyenBay,
            }).then(function successCallback(response) {
                alert('thành công');
            }, function errorCallback(response) {
                alert('thất bại');
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });
    };

    // $scope.init();

    
    });