app.controller('homeCtrl', function($base64, $scope, Upload, $cookies, $http, Data, $rootScope, $location) {
    $scope.prescription = '';

    $scope.upload = function(prescription1) {
        if ($rootScope.authenticated == false) {
            $location.path('login');
        } else {
            console.log(prescription1);
            console.log($base64.encode(prescription1))
            var data1 = $.param({
                uname: $cookies.userName,
                prescription: $base64.encode(prescription1)
            });
            $http({
                    method: 'post',
                    url: 'http://52.77.213.144/Curifiq/add_prescription.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    Data.toast('success', 'Product added to the cart.')
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



    $scope.logout = function() {
        $cookies.userName = '';
        Data.toast("success", "Successfuly Logged Out");
        $location.path('home');
        $rootScope.authenticated = false;
    }
});
