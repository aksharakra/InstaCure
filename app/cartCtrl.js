app.controller('cartCtrl', function($scope, $rootScope, $location, $cookies, $http, Data) {
    $scope.isCollapsed = false;
    if ($rootScope.authenticated == false) {
        $location.path('login');
    } else {
        $scope.fetchData = function() {
            var data1 = $.param({
                uname: $rootScope.email
            });
            $http({
                    method: 'post',
                    url: 'http://52.77.213.144/Curifiq/cart.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    $scope.cart_data = data;
                });
        }
        $scope.fetchData();
        $scope.remove = function(pid) {
            var data2 = $.param({
                uname: $rootScope.email,
                pid: pid
            });
            $http({
                    method: 'post',
                    url: 'http://52.77.213.144/Curifiq/remove_from_cart.php',
                    data: data2,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    Data.toast('success', 'Removed from cart.')
                    $scope.fetchData();
                });
        }
        $scope.logout = function() {
            $cookies.userName = '';
            Data.toast("success", "Successfuly Logged Out");
            $location.path('home');
            $rootScope.authenticated = false;
        }
    }
});
