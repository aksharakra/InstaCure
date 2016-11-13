app.controller('authCtrl', function($scope, $rootScope, $routeParams, $location, $cookies, $http, Data) {
    $scope.isCollapsed = false;
    if ($rootScope.authenticated == true) {
        $location.path('dashboard');
        var data1 = $.param({
            uname: $rootScope.email
        });
        $http({
                method: 'post',
                url: 'http://52.77.213.144/Curifiq/user_profile.php',
                data: data1,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                $scope.user_data = data;
            });
    }
    $scope.login = {};
    $scope.signup = {};
    $scope.doLogin = function(customer) {
        var data1 = $.param({
            uname: customer.email,
            pass: customer.password
        });
        $http({
                method: 'post',
                url: 'http://52.77.213.144/Curifiq/user_authentication.php',
                data: data1,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                if (data.result == "success") {
                    $cookies.userName = customer.email;
                    Data.toast('success', 'Successfuly Logged In');
                    $location.path('home');
                } else {}
            });
    };
    $scope.signup = { username: '', password: '', name: '', phone: '' };
    $scope.signUp = function(customer) {
        var data1 = $.param({
            uname: customer.username,
            pass: customer.password,
            name: customer.name,
            pno: customer.phone
        });
        $http({
                method: 'post',
                url: 'http://52.77.213.144/Curifiq/new_user.php',
                data: data1,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                if (data.result == "success") {
                    console.log(data)
                    $cookies.userName = customer.username;
                    Data.toast('success', 'Successfuly Registered');
                    $location.path('home');
                } else {

                }
            });
    };
    $scope.logout = function() {
        $cookies.userName = '';
        Data.toast("success", "Successfuly Logged Out");
        $location.path('home');
        $rootScope.authenticated = false;
    }
});
