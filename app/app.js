var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ngCookies', 'ngFileUpload', 'angular-google-analytics', '720kb.datepicker', 'simplePagination']);
app.config(['AnalyticsProvider', function (AnalyticsProvider) {
   AnalyticsProvider.setAccount('UA-66101416-4');
}]).run(['Analytics', function(Analytics) { }]);

app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/login', {
                    templateUrl: 'partials/login.html',
                    controller: 'authCtrl'
                })
                .when('/logout', {
                    templateUrl: 'partials/login.html',
                    controller: 'logoutCtrl'
                })
                .when('/signup', {
                    templateUrl: 'partials/signup.html',
                    controller: 'authCtrl'
                })
                .when('/home', {
                    templateUrl: 'partials/home.html',
                    controller: 'homeCtrl'
                })
                .when('/dashboard', {
                    templateUrl: 'partials/dashboard.html',
                    controller: 'authCtrl'
                })
                .when('/edit', {
                    templateUrl: 'partials/edit_profile.html',
                    controller: 'profileCtrl'
                })
                .when('/cart', {
                    templateUrl: 'partials/cart.html',
                    controller: 'cartCtrl'
                })
                .when('/orders', {
                    templateUrl: 'partials/orders.html',
                    controller: 'ordersCtrl'
                })
                .when('/checkout', {
                    templateUrl: 'partials/checkout.html',
                    controller: 'checkoutCtrl'
                })
                .when('/prescription', {
                    templateUrl: 'partials/presc.html',
                    controller: 'prescCtrl'
                })
                .when('/chat', {
                    templateUrl: 'partials/chat.html',
                    controller: 'chatCtrl'
                })
                .when('/result/:query', {
                    templateUrl: 'partials/result.html',
                    controller: 'resultCtrl'
                })
                .when('/search', {
                    templateUrl: 'partials/result.html',
                    controller: 'resultCtrl'
                })
                .when('/', {
                    templateUrl: 'partials/home.html',
                    controller: 'homeCtrl'
                })
                .otherwise({
                    redirectTo: '/home'
                });
        }
    ])
    .run(function($rootScope, $location, $cookies, Data) {
        $rootScope.home = function(){
            $location.path('home');
        }
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            $rootScope.authenticated = false;
            var a = $cookies.userName;
            if (a != '' && a != undefined) {
                $rootScope.authenticated = true;
                $rootScope.email = a;
            } else {
                var nextUrl = next.$$route.originalPath;
                if (nextUrl == '/signup' || nextUrl == '/login' || nextUrl == '/result/:query' || nextUrl == '/home' || nextUrl == '/search') {

                } else {
                    $location.path("/login");
                }
            }
        });
    });
