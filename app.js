var app = angular.module('loginapp', [
    'ui.router',
    'uiKernel',
    'stripe-payment-tools',
    'angular.filter',
    '720kb.datepicker'
]);

app.config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/additional_cover');

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
        }).state('dialog-compare', {
            url: '/dialog-compare',
            templateUrl: 'partials/dialog-compare.html',
            controller: 'DialogController'
        })
        .state('payment', {
            url: '/payment?name&sender&title&companyname&companylogolarge&stripdescription&companylogosmall&stripebutton&stripepublishkey&checkoutbutton&policy&period',
            templateUrl: 'partials/payment.html',
            controller: 'PaymentController'
        })
        .state('additional_cover', {
            url: '/additional_cover?name&sender&title&companyname&companylogolarge&stripdescription&companylogosmall&stripebutton&stripepublishkey&checkoutbutton',
            templateUrl: 'partials/janashakthi_additional_cover.html',
            controller: 'PaymentController'
        })
        .state('get_premium', {
            url: '/get_premium?name&sender&title&companyname&companylogolarge&stripdescription&companylogosmall&stripebutton&stripepublishkey&checkoutbutton',
            templateUrl: 'partials/get-premium.html',
            controller: 'PaymentController'
        })
        .state('book_date', {
            url: '/book_date?name&sender&title&companyname&companylogolarge&stripdescription&companylogosmall&stripebutton&stripepublishkey&checkoutbutton',
            templateUrl: 'partials/aitken_spence/datepicker.html',
            controller: 'PaymentController'
        });

}

);

app.controller('MainController', ['$scope', '$rootScope', '$state', '$timeout', '$http', mainController]);


function mainController($scope, $rootScope, $state, $timeout, $http) {
    console.log("login Application started");
}