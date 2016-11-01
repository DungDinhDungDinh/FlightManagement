var myapp = angular.module('myApp', ['ngRoute']);

myapp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: './view/home.html',
        controller: 'myCtrl'
    }).
    when('/chon-chuyen-bay', {
        templateUrl: './view/chon-chuyen-bay.html',
        controller: 'chonChuyenBayCtrl'
    }).
    when('/nhap-thong-tin-khach', {
        templateUrl: './view/nhap-thong-tin-khach.html',
        controller: 'thongTinKhachHangCtrl'
    }).
    when('/thong-tin-chuyen-bay-1', {
        templateUrl: './view/thong-tin-chuyen-bay-1.html',
        controller: 'thongTinChuyenBay1Ctrl'
    }).
    when('/thong-tin-chuyen-bay-2', {
        templateUrl: './view/thong-tin-chuyen-bay-2.html',
        controller: 'thongTinChuyenBay2Ctrl'
    }).
    when('/thong-tin-chuyen-bay-3', {
        templateUrl: './view/thong-tin-chuyen-bay-3.html',
        controller: 'thongTinChuyenBay3Ctrl'
    }).
    when('/admin-them-chuyen-bay', {
        templateUrl: './view/admin-them-chuyen-bay.html',
        controller: 'adminThemChuyenBayCtrl'
    }).
    when('/admin-dang-nhap', {
        templateUrl: './view/admin-dang-nhap.html',
        controller: 'adminDangNhapCtrl'
    }).
    when('/admin-xem-dat-ve', {
        templateUrl: './view/admin-xem-dat-ve.html',
        controller: 'adminXemDatVeCtrl'
    }).
    when('/admin-chinh-sua-chuyen-bay-1', {
        templateUrl: './view/admin-chinh-sua-cb.html',
        controller: 'adminChinhSuaChuyenBay1Ctrl'
    }).
    when('/admin-chinh-sua-chuyen-bay-2', {
        templateUrl: './view/admin-chinh-sua-cb-2.html',
        controller: 'adminChinhSuaChuyenBay2Ctrl'
    }).
    otherwise({
        redirectTo: '/'
    });
}]);


myapp.service('Data', function() {
    this.flights = [];
    this.backFlights = [];
    this.soGheDi;
    this.khuHoi = false;
    this.selectedFlight = {};
    this.selectedBackFlight = {};
});