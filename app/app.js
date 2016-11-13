var app = angular.module('myApp', ['ngRoute', 'ngAnimate', 'toaster', 'ngCookies', 'ngFileUpload', 'base64']);

app.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/login', {
                    title: 'Login',
                    templateUrl: 'partials/login.html',
                    controller: 'authCtrl'
                })
                .when('/logout', {
                    title: 'Logout',
                    templateUrl: 'partials/login.html',
                    controller: 'logoutCtrl'
                })
                .when('/signup', {
                    title: 'Signup',
                    templateUrl: 'partials/signup.html',
                    controller: 'authCtrl'
                })
                .when('/home', {
                    title: 'Home',
                    templateUrl: 'partials/home.html',
                    controller: 'homeCtrl'
                })
                .when('/dashboard', {
                    title: 'Dashboard',
                    templateUrl: 'partials/dashboard.html',
                    controller: 'authCtrl'
                })
                .when('/edit', {
                    title: 'Edit Profile',
                    templateUrl: 'partials/edit_profile.html',
                    controller: 'profileCtrl'
                })
                .when('/cart', {
                    title: 'Cart',
                    templateUrl: 'partials/cart.html',
                    controller: 'cartCtrl'
                })
                .when('/prescription', {
                    title: 'Prescription',
                    templateUrl: 'partials/presc.html',
                    controller: 'prescCtrl'
                })
                .when('/chat', {
                    title: 'Chat',
                    templateUrl: 'partials/chat.html',
                    controller: 'chatCtrl'
                })
                .when('/result/:query', {
                    title: 'Search Result',
                    templateUrl: 'partials/result.html',
                    controller: 'resultCtrl'
                })
                .when('/', {
                    title: 'Home',
                    templateUrl: 'partials/home.html',
                    controller: 'homeCtrl'
                })
                .otherwise({
                    redirectTo: '/home'
                });
        }
    ])
    .run(function($rootScope, $location, $cookies, Data) {
        $rootScope.$on("$routeChangeStart", function(event, next, current) {
            $rootScope.authenticated = false;
            var a = $cookies.userName;
            if (a != '' && a != undefined) {
                $rootScope.authenticated = true;
                $rootScope.email = a;
            } else {
                var nextUrl = next.$$route.originalPath;
                if (nextUrl == '/signup' || nextUrl == '/login' || nextUrl == '/result/:query' || nextUrl == '/home') {

                } else {
                    $location.path("/login");
                }
            }
        });
    });