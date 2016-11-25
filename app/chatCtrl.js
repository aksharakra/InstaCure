app.controller('chatCtrl', function($scope, $rootScope, $location, $cookies, $http, Data) {
    $scope.isCollapsed = false;
    $scope.key = {};
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
    $scope.search = function(key){
        $location.path('search').search(key);
    }
    if ($rootScope.authenticated == false) {
        $location.path('login');
    } else {
        $scope.fetchChats = function() {
            var data1 = $.param({
                uname: $rootScope.email
            });
            $http({
                    method: 'post',
                    url: 'http://54.179.136.115/Curifiq/chat.php',
                    data: data1,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    $scope.chat = data;
                });
        }
        $scope.fetchChats();
        $scope.sendMsg = function(msg) {
            var data2 = $.param({
                uname: $rootScope.email,
                from: 'me',
                msg: msg
            });
            $http({
                    method: 'post',
                    url: 'http://54.179.136.115/Curifiq/chat_new.php',
                    data: data2,
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
                })
                .success(function(data) {
                    // Data.toast('success', 'Removed from cart.')
                    $scope.msg = null;
                    $scope.fetchChats();
                });
        }


    }
});
