angular.module('flightManagementApp', [])
    .controller('FlightManagementController', function($scope, $http) {
    $scope._maChuyenBay = 'SGN',

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

    $scope.init();
    });