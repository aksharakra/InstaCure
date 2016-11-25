app.controller('authCtrl', function($scope, $rootScope, $routeParams, $location, $cookies, $http, Data, Upload) {
    $scope.isCollapsed = false;
    $scope.key = {};
    $scope.search = function(key){
        $location.path('search').search(key);
    }
    $scope.length = 0;
    $scope.fetchData = function() {
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
    $scope.fetchData();
    if ($rootScope.authenticated == true) {
        $location.path('dashboard');
        $scope.fetchData = function() {
            var data1 = $.param({
                uname: $rootScope.email
            });
            $http({
                    method: 'post',
                    url: 'http://54.179.136.115/Curifiq/user_profile.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    $scope.user_data = data;
                    if(data.pphoto == undefined){
                        $scope.user_data.pphoto = 'image/default.jpg';
                    }
                });
        }
        $scope.fetchData();
        $scope.upload = function(file) {
            file.upload = Upload.upload({
                url: 'http://54.179.136.115/Curifiq/add_prescription.php',
                method: 'POST',
                sendFieldsAs: 'form',
                fields: { uname: $cookies.userName, prescription: file },
            });

            file.upload.then(function(response) {
                Data.toast('success', 'Prescription uploaded.')
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
        $scope.change = function(file) {
            file.upload = Upload.upload({
                url: 'http://54.179.136.115/Curifiq/edit_user_profile.php',
                method: 'POST',
                sendFieldsAs: 'form',
                fields: { uname: $cookies.userName, pphoto: file },
            });

            file.upload.then(function(response) {
                Data.toast('success', 'Photo changed.')
                $scope.fetchData();
                $timeout(function() {
                    file.result = response.data;
                });
            }, function(response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ': ' + response.data;
            }, function(evt) {
                file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
            });
        }
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
                url: 'http://54.179.136.115/Curifiq/user_authentication.php',
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
                url: 'http://54.179.136.115/Curifiq/new_user.php',
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
