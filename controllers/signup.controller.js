/* use strickt */

app.controller('SignupController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$otp', '$profile', signupController]);

function signupController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $otp, $profile) {
    console.log("signup page loaded");
    
    $scope.user = {};
    $scope.processing = false;
    $scope.lockEmail = false;

    if ($state.params && $state.params.name) {
        var name = $state.params.name.split(" ");
        var sender = [""];
        if($state.params.sender != undefined){
            sender = $state.params.sender.split("-");    
        }

        $scope.user.name = $state.params.name;
        $scope.user.fname = name[0] || "";
        $scope.user.lname = name[1] || "";
        $scope.user.senderId = sender[1] || "";
        //getProfile($state.params.name);
    }

    $scope.authenticate = function () {
        $scope.processing = true;
        $otp.send($scope.user.mobile,$scope.user.name).then(function (response, status) {
            if (response.data.IsSuccess) {
                $scope.processing = false;
                $state.go("verify-mobile", {user: $scope.user});
                $scope.user = {};
            } else {
                alert(response.data.Error);
                $scope.processing = false;
            }
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $scope.processing = false;
        });
        
    }



}