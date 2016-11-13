<!DOCTYPE html>
<html lang="en" ng-app="myApp">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <title>InstaCure</title>
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" rel="stylesheet">
    <link href="css/toaster.css" rel="stylesheet">
    <link rel="stylesheet" href="css/mui.min.css">
    <link href="css/custom.css" rel="stylesheet">
    <style>
    a {
        color: orange;
    }
    </style>
    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]><link href= "css/bootstrap-theme.css"rel= "stylesheet" >

<script src="https://oss.maxcdn.com/libs/html5shiv/3.7.0/html5shiv.js"></script>
<script src="https://oss.maxcdn.com/libs/respond.js/1.4.2/respond.min.js"></script>
<![endif]-->
</head>

<body ng-cloak="">
    <div data-ng-view="" id="ng-view" class="slide-animation"></div>
</body>
<toaster-container toaster-options="{'time-out': 3000}"></toaster-container>
<!-- Libs -->
<script src="js/angular.min.js"></script>
<script src="js/angular-route.min.js"></script>
<script src="js/angular-animate.min.js"></script>
<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-cookies.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
<script src="js/ng-file-upload.min.js"></script>
<script src="js/angular-base64.min.js"></script>
<script src="js/toaster.js"></script>
<script src="js/mui.min.js"></script>
<script src="app/app.js"></script>
<script src="app/data.js"></script>
<script src="app/directives.js"></script>
<script src="app/authCtrl.js"></script>
<script src="app/cartCtrl.js"></script>
<script src="app/resultCtrl.js"></script>
<script src="app/homeCtrl.js"></script>
<script src="app/chatCtrl.js"></script>
<script src="app/prescCtrl.js"></script>
</html>
