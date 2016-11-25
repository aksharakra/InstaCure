app.controller('ordersCtrl', function($scope, $rootScope, $location, Upload, $cookies, $http, Data) {
    $scope.prescription = '';
    $scope.payable = 0;
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
                    url: 'http://54.179.136.115/Curifiq/myorders.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    $scope.cart_data = data;
                    var total = 0;
                    for (var i = 0; i < $scope.cart_data.length; i++) {
                        var product = $scope.cart_data[i];
                        total += (product.price * product.quantity);
                    }
                    $scope.payable = total;
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
                    url: 'http://54.179.136.115/Curifiq/remove_from_cart.php',
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
