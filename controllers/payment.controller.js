/* use strickt */

app.controller('PaymentController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$invoice', paymentController]);

function paymentController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $invoice) {
    console.log("payment page loaded");

    $scope.user = {};
    $scope.payment = { method: "Cash" };
    $scope.isPaymentSuccess = false;
    $scope.processing = false;

    if ($state.params && $state.params.name) {
        var name = $state.params.name.split(" ");
        var sender = $state.params.sender.split(":");

        $scope.user.name = $state.params.name;
        $scope.user.fname = name[0] || "";
        $scope.user.lname = name[1] || "";
        $scope.user.senderId = sender[1] || "";

        $scope.payment.entity = $state.params.entity || "";
        $scope.payment.type = $state.params.type || "";

        getProfile($state.params.name);
    }

    $scope.pay = function () {
        $invoice.createRecipt($scope.user, $scope.payment).then(function (response, status) {
            if (response.data.error == null) {
                sendReciptToBot();
                isPaymentSuccess = true;
            } else {
                alert(response.data.error)
            }
        }, function (response) {
            alert(response)
        });
    }

    function sendReciptToBot () {
        $http({
            method: "POST",
            url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAAQctctsh6UBANUX9Snmt7LB3ZAXXFZBOFsiZAIKUm0oIYoZCxMTjsjGXhcSgO4y492zriId3ceZAZBtliyPCvyNVmS7r3ShFuSZCd2TVQN10ZCQnUuOLhuByY9MruAOCpC8dbTaxZCPig9Y9ZC5dK2i9Tf2StYTWywPWAD8ZAc1tyVsAZDZD",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                "messaging_type": "RESPONSE",
                "recipient": {
                    "id": $scope.user.senderId,
                },
                "message": {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "receipt",
                            "recipient_name": $scope.user.name,
                            "order_number": $scope.payment.invoiceNo,
                            "currency": "USD",
                            "payment_method": "Visa",
                            "order_url": "",
                            "timestamp": Date.now(),
                            "address": {
                                "street_1": "Cinnamon Gardens",
                                "street_2": "Colombo 07",
                                "city": "Colombo",
                                "postal_code": "11010",
                                "state": "",
                                "country": "Sri Lanka"
                            },
                            "summary": {
                                "subtotal": $scope.payment.amount,
                                "shipping_cost": 0.00,
                                "total_tax": 0.00,
                                "total_cost": $scope.payment.amount,
                            },
                            "adjustments": [],
                            "elements": [{
                                "title": $scope.payment.entity + " payment",
                                "subtitle": $scope.payment.entity + " payment",
                                "price": $scope.payment.amount,
                                "currency": "USD",
                                "image_url": "http://colomboo.lk/assets/media/vendors/5260/logo_image.png"
                            }]
                        }
                    }
                }
            }
        }).then(function (response, status) {
            isPaymentSuccess = true;
        }, function (response, status) {
            alert(response.data);
        });
    }

    function getProfile (name) {
        $scope.processing = true;
        $http({
            method: "GET",
            url: $systemUrls.invoiceService + "/GetProfile/" + (name || ""),
            headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            }
        }).then(function (response, status) {
            if (response.data.IsSuccess) {
                var profile = response.data.Result;
                $scope.user['fname'] = profile.first_name;
                $scope.user['lname'] = profile.last_name;
                $scope.user['email'] = profile.email_addr;
                $scope.user['profileID'] = profile.profileId;
                $scope.processing = false;
            } else {
                alert(response.data.CustomMessage);
                $scope.processing = false;
            }
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $scope.processing = false;
        });
    }
}
