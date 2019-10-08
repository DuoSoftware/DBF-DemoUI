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
        .state('restaurant_reservation', {
            url: '/restaurant_reservation?name&sender&title&companyname&companylogolarge&stripdescription&companylogosmall&stripebutton&stripepublishkey&checkoutbutton',
            templateUrl: 'partials/aitken_spence/restaurant_reservation.html',
            controller: 'PaymentController'
        })
        .state('room_reservation', {
            url: '/room_reservation?name&sender&title&companyname&companylogolarge&stripdescription&companylogosmall&stripebutton&stripepublishkey&checkoutbutton',
            templateUrl: 'partials/aitken_spence/room_reservation.html',
            controller: 'PaymentController'
        });

}

);

app.controller('MainController', ['$scope', '$rootScope', '$state', '$timeout', '$http', mainController]);


function mainController($scope, $rootScope, $state, $timeout, $http) {
    console.log("login Application started");
}

app.directive('counter', function() {
    return {
        restrict: 'A',
        scope: { value: '=value' },
        template: '<a href="javascript:;" class="counter-minus" ng-click="minus()">-</a>\
                  <input type="text" class="counter-field" ng-model="value" ng-change="changed()" ng-readonly="readonly">\
                  <a  href="javascript:;" class="counter-plus" ng-click="plus()">+</a>',
        link: function( scope , element , attributes ) {
            // Make sure the value attribute is not missing.
            if ( angular.isUndefined(scope.value) ) {
                throw "Missing the value attribute on the counter directive.";
            }

            var min = angular.isUndefined(attributes.min) ? null : parseInt(attributes.min);
            var max = angular.isUndefined(attributes.max) ? null : parseInt(attributes.max);
            var step = angular.isUndefined(attributes.step) ? 1 : parseInt(attributes.step);

            element.addClass('counter-container');

            // If the 'editable' attribute is set, we will make the field editable.
            scope.readonly = angular.isUndefined(attributes.editable) ? true : false;

            /**
             * Sets the value as an integer.
             */
            var setValue = function( val ) {
                scope.value = parseInt( val );
            }

            // Set the value initially, as an integer.
            setValue( scope.value );

            /**
             * Decrement the value and make sure we stay within the limits, if defined.
             */
            scope.minus = function() {
                if ( min && (scope.value <= min || scope.value - step <= min) || min === 0 && scope.value < 1 ) {
                    setValue( min );
                    return false;
                }
                setValue( scope.value - step );
            };

            /**
             * Increment the value and make sure we stay within the limits, if defined.
             */
            scope.plus = function() {
                if ( max && (scope.value >= max || scope.value + step >= max) ) {
                    setValue( max );
                    return false;
                }
                setValue( scope.value + step );
            };

            /**
             * This is only triggered when the field is manually edited by the user.
             * Where we can perform some validation and make sure that they enter the
             * correct values from within the restrictions.
             */
            scope.changed = function() {
                // If the user decides to delete the number, we will set it to 0.
                if ( !scope.value ) setValue( 0 );

                // Check if what's typed is numeric or if it has any letters.
                if ( /[0-9]/.test(scope.value) ) {
                    setValue( scope.value );
                }
                else {
                    setValue( scope.min );
                }

                // If a minimum is set, let's make sure we're within the limit.
                if ( min && (scope.value <= min || scope.value - step <= min) ) {
                    setValue( min );
                    return false;
                }

                // If a maximum is set, let's make sure we're within the limit.
                if ( max && (scope.value >= max || scope.value + step >= max) ) {
                    setValue( max );
                    return false;
                }

                // Re-set the value as an integer.
                setValue( scope.value );
            };
        }
    }
});