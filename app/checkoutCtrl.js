app.controller('checkoutCtrl', function($scope, $rootScope, $routeParams, $location, $cookies, $http, Data, Upload) {
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
        $scope.pid = '';
        $scope.file = '';
        $scope.pppid = function(c){
            $scope.file = c.file;
            $scope.pid = c.pid;
        }
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
        $scope.fetchPresc = function() {
            var data1 = $.param({
                uname: $rootScope.email
            });
            $http({
                    method: 'post',
                    url: 'http://54.179.136.115/Curifiq/recieve_prescription.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    $scope.presc = data;
                });
        }
        $scope.fetchPresc();
        $scope.order = function() {
            var data1 = $.param({
                uname: $rootScope.email,
                pno: $scope.user_data.pno,
                area: $scope.user_data.address.area,
                locality: $scope.user_data.address.locality,
                houseno: $scope.user_data.address.houseno,
                city: $scope.user_data.address.city,
                pcode: $scope.user_data.pcode,
                ddate: $scope.user_data.ddate,
                dtime: $scope.user_data.dtime,
                pid: $scope.pid
            });
            $http({
                    method: 'post',
                    url: 'http://54.179.136.115/Curifiq/checkout.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    Data.toast('success', 'Order Placed Successfully.');
                    $location.path('home');
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
                $scope.fetchPresc();
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
    } else{
        $location.path('login');
    }
});
