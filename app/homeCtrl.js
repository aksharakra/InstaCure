app.controller('homeCtrl', function($scope, Upload, $cookies, $timeout, $http, Data, $rootScope, $location) {
    $scope.prescription = '';
    $scope.browse = '';
    $scope.upload = function(file) {
        if ($rootScope.authenticated == false) {
            $location.path('login');
        } else {
            file.upload = Upload.upload({
                url: 'http://52.77.213.144/Curifiq/add_prescription.php',
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
                url: 'http://52.77.213.144/Curifiq/medicines.php',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            })
            .success(function(data) {
                $scope.browse = data;
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
