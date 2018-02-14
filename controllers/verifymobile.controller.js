app.controller('VerifyMobileController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$otp', '$profile', '$invoice', verifyMobileController]);

function verifyMobileController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $otp, $profile, $invoice) {
    console.log("verify mobile page loaded");

    $scope.user = {};
    $scope.processing = false;

    if ($state.params && $state.params.user) {
        $scope.user = $state.params.user;
    }

    $scope.checkVerification = function (mobile, code) {
        $scope.processing = true;
        var payment = { method: "Cash", amount: 1000000 };

        $otp.verify(mobile, code, $scope.user.name).then(function (response, status) {
            if (response.data && response.data.IsSuccess) {
                // valid otp code
                $profile.onFacetone.registerProfile($scope.user).then(function (response, status) {
                    if (response.data && response.data.IsSuccess) {
                        registerProfileOnCloudcharge($scope.user).then(function (response) {
                            $invoice.createRecipt($scope.user, payment).then(function () {
                                $scope.processing = false;
                                $state.go("registration-success", { user: $scope.user });
                                $scope.user = {};
                            }, function (response) {
                                $scope.processing = false;
                                alert(response);
                            });
                        }, function (response) {
                            $scope.processing = false;
                            alert(response);
                        });
                    } else {
                        $scope.processing = false;
                        alert(response.data.CustomMessage);
                    }
                }, function (response, status) {
                    $scope.processing = false;
                    alert(response);
                });
            } else {
                $scope.processing = false;
                alert(response.data.CustomMessage);
            }
        }, function (response, status) {
            // error in otp code validation
            alert(response);
        });
    }

    function registerProfileOnCloudcharge(profile) {
        return Promise.all([
            $profile.onCloudcharge.registerWithBank(profile),
            $profile.onCloudcharge.registerWithMerchant(profile),
            $profile.onCloudcharge.registerWithTelecommunicationProvider(profile),
            $profile.onCloudcharge.registerWithUtilityProvider(profile)
        ]);
    }
}