myapp.controller('adminDangNhapCtrl',  ['$scope', '$http', 'Data', '$location', '$rootScope', function ($scope, $http, Data, $location, $rootScope) {
	
	$scope.dangNhap = function(){ 
		$http({
                method: 'POST',
                url: '/api/authenticate',
                data: {
                	'username': $scope.userName,
                	'password': $scope.passWord
                }
            }).then(function successCallback(response) {
                Data.token = response.data.token;
                console.log('token',Data.token);
                $location.path('/admin-them-chuyen-bay');
            }, function errorCallback(response) {
                console.log('Authenticating failed!');

            });


    };
}]);