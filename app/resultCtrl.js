app.controller('resultCtrl', function($scope, $rootScope, $location, $http, Data, $cookies, $routeParams) {
    $scope.key = $routeParams.query;
    console.log($rootScope.authenticated)
    $scope.isCollapsed = false;
    $scope.qty = 1;
    $scope.result = '';
    var data1 = $.param({
        search: $scope.key
    });
    $http({
            method: 'post',
            url: 'http://52.77.213.144/Curifiq/search.php',
            data: data1,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        .success(function(data) {
            $scope.result = data;
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
                    url: 'http://52.77.213.144/Curifiq/add_to_cart.php',
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
