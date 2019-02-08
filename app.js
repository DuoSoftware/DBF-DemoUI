var app = angular.module('loginapp', [
    'ui.router',
    'uiKernel',
    'stripe-payment-tools'
]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/signup');

    $stateProvider

        .state('signin', {
            url: '/signin',
            templateUrl: 'partials/signin.html',
            controller: 'SigninController'
        }).state('signup', {
            url: '/signup?name&sender',
            templateUrl: 'partials/signup.html',
            controller: 'SignupController'
        }).state('verify-mobile', {
            url: '/verify-mobile',
            params: {
                user: null
            },
            templateUrl: 'partials/verify-mobile.html',
            controller: 'VerifyMobileController'
        }).state('registration-success', {
            url: '/registration-success',
            params: {
                user: null
            },
            templateUrl: 'partials/registration-success.html',
            controller: 'SuccessRegistration'
        }).state('payment', {
            url: '/payment?name&sender&title&companyname&companylogolarge&stripdescription&companylogosmall&stripebutton&stripepublishkey&checkoutbutton',
            templateUrl: 'partials/payment.html',
            controller: 'PaymentController'
        });

}

);

app.controller('MainController', ['$scope', '$rootScope', '$state', '$timeout', '$http', mainController]);


function mainController($scope, $rootScope, $state, $timeout, $http) {
    console.log("login Application started");
}