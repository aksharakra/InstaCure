app.controller('profileCtrl', function($scope, $rootScope, $routeParams, $location, $cookies, $http, Data, Upload) {
    $scope.key = {};
    $scope.length = 0;
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
    $scope.search = function(key){
        $location.path('search').search(key);
    }
    if ($rootScope.authenticated == true) {
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
                    if (data.pphoto == undefined) {
                        $scope.user_data.pphoto = 'image/default.jpg';
                    }
                });
        }
        $scope.fetchData();
        $scope.save = function() {
            var data1 = $.param({
                uname: $rootScope.email,
                email: $scope.user_data.email,
                pno: $scope.user_data.pno,
                gender: $scope.user_data.gender,
                dob: $scope.user_data.dob,
                area: $scope.user_data.address.area,
                locality: $scope.user_data.address.locality,
                houseno: $scope.user_data.address.houseno,
                city: $scope.user_data.address.city,
            });
            $http({
                    method: 'post',
                    url: 'http://54.179.136.115/Curifiq/edit_user_profile.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    $scope.user_data = data;
                    $location.path('dashboard');
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
        $scope.login = {};
        $scope.signup = {};
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
        $scope.logout = function() {
            $cookies.userName = '';
            Data.toast("success", "Successfuly Logged Out");
            $location.path('home');
            $rootScope.authenticated = false;
        }
    }
});
