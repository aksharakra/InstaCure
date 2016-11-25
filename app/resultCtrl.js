app.controller('resultCtrl', function($scope, $rootScope, $location, $http, Data, $cookies, $routeParams, Pagination) {
    $scope.length = 0;
    $scope.pagination = Pagination.getNew(20);
    $scope.fetchCartValue = function() {
        if ($rootScope.authenticated == true) {
            var data1 = $.param({
                uname: $rootScope.email
            });
            $http({
                    method: 'post',
                    url: 'http://54.179.136.115/Curifiq/cart.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    $scope.length = data.length;
                });
        }
    }
    $scope.fetchCartValue();
    $scope.key = $routeParams.query;
    key = {
        name: '',
        salt: '',
        manufacturer: '',
        minprice: '',
        maxprice: ''
    }
    console.log(key);
    $scope.key = $location.search();
    $scope.isCollapsed = false;
    $scope.qty = 1;
    $scope.result = '';
    var data1 = $.param({
        search: $scope.key.name
    });
    $http({
            method: 'post',
            url: 'http://54.179.136.115/Curifiq/search.php',
            data: data1,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data) {
            $scope.result = data;
            $scope.pagination.numPages = Math.ceil($scope.result.length/$scope.pagination.perPage);
        });
    $scope.addToCart = function(pid, qty) {
        if ($rootScope.authenticated == false || $cookies.userName == '' || $cookies.userName == undefined) {
            $location.path('/login');
        } else {
            var data1 = $.param({
                uname: $cookies.userName,
                pid: pid,
                quantity: qty
            });
            $http({
                    method: 'post',
                    url: 'http://54.179.136.115/Curifiq/add_to_cart.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    Data.toast('success', 'Product added to the cart.')
                });
        }
    }
    $scope.logout = function() {
        $cookies.userName = '';
        Data.toast("success", "Successfuly Logged Out");
        $location.path('home');
        $rootScope.authenticated = false;
    }
});
