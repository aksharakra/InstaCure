app.factory("Data", ['$http', 'toaster',
    function ($http, toaster) {

        var obj = {};
        obj.toast = function (status, data) {
            toaster.pop(status, "", data, 10000, 'trustedHtml');
        }
        return obj;
}]);