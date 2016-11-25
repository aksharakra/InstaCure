app.controller('homeCtrl', function($scope, Upload, $cookies, $timeout, $http, Data, $rootScope, $location, Pagination) {
    $scope.prescription = '';
    $scope.browse = '';
    $scope.key = {};
    $scope.qty = 1;
    $scope.pagination = Pagination.getNew(20);
    $scope.search = function(key) {
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
    $scope.upload = function(file) {
        if ($rootScope.authenticated == false) {
            $location.path('login');
        } else {
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
    }
    $scope.browse = function() {
        $http({
                method: 'post',
                url: 'http://54.179.136.115/Curifiq/medicines.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                $scope.browse = data;
                $scope.pagination.numPages = Math.ceil($scope.browse.length/$scope.pagination.perPage);
            });
    }
    $scope.browse();
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
                    Data.toast('success', 'Product added to the cart.');
                    $scope.fetchData();
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
