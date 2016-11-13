app.controller('prescCtrl', function($scope, $rootScope, $location, $cookies, $http, Data) {
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
                    url: 'http://52.77.213.144/Curifiq/recieve_prescription.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    $scope.presc = data;
                });
        }
        $scope.fetchData();
        $scope.logout = function() {
            $cookies.userName = '';
            Data.toast("success", "Successfuly Logged Out");
            $location.path('home');
            $rootScope.authenticated = false;
        }
    }
});
