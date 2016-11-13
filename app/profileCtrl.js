app.controller('profileCtrl', function($scope, $rootScope, $routeParams, $location, $cookies, $http, Data, Upload) {
    if ($rootScope.authenticated == true) {
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
    $scope.logout = function() {
        $cookies.userName = '';
        Data.toast("success", "Successfuly Logged Out");
        $location.path('home');
        $rootScope.authenticated = false;
    }
});
