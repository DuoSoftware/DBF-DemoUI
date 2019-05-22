/* use strickt */

app.controller('DialogController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$invoice', paymentController]);

function paymentController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $invoice) {
    console.log("Demo page controller loaded");


    $rootScope.processing = false;
}
