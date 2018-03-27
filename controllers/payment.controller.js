/* use strickt */

app.controller('PaymentController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$invoice', paymentController]);

function paymentController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $invoice) {
    console.log("payment page loaded");

    $scope.user = {};
    $scope.payment = { method: "Cash", invoiceNo: "" };
    $scope.isPaymentSuccess = false;
    $scope.processing = false;

    if ($state.params && $state.params.name) {
        var name = $state.params.name.split(" ");

        var sender = [""];
        if ($state.params.sender.indexOf(':') >= 0) {
            sender = $state.params.sender.replace('dbf:', '');
            sender = sender.split(":");
        } else {
            sender = $state.params.sender.split("-");
        }


        //var sender = $state.params.sender.split("-");

        $scope.user.name = $state.params.name;
        $scope.user.senderId = sender[1] || "";

        $scope.payment.invoiceNo = Math.floor((Math.random() * 10000000) + 1);
        $scope.payment.category = $state.params.category;
        $scope.payment.vehicle = $state.params.vehicle;
        $scope.payment.pickupdate = $state.params.pickupdate;
        $scope.payment.dropoffdate = $state.params.dropoffdate;
        $scope.payment.nic = $state.params.nic;
        $scope.payment.phone = $state.params.phone;
        $scope.payment.pickuplocation = $state.params.pickuplocation;
        $scope.payment.price = Math.floor((Math.random() * 10000) + 1);

        //getProfile($state.params.name);
    }

    $scope.resultCount = 0;
    $scope.pay = function () {
        $scope.processing = true;
        sendReciptToBot($scope.payment.invoiceNo, "https://www.cargillsbank.com/", "http://smoothflow.io/facetone/DBF-DemoUI/img/rentacar.png");
        // var bankToken = "12c95918-17d6-4ab7-a1cb-933afee648c0,bank.app.cloudcharge.com";
        // var merchantToken = "";
        // if ($scope.payment.entity == "ceb") {
        //     merchantToken = "54fd39f4-dd3e-4396-901b-d336ee03d13b,cebinv.app.cloudcharge.com";
        // } else if ($scope.payment.entity == "dialog") {
        //     merchantToken = "a461fcc8-82d0-4a57-894d-0a70bc1c9504,dialoginv.app.cloudcharge.com";
        // } else if ($scope.payment.entity == "odel") {
        //     merchantToken = "7002abf4-2675-4b98-8cbf-eb8b37c6ba46,odelinv.app.cloudcharge.com";
        // }

        // // recipt to bank account
        // $invoice.createRecipt($scope.user, $scope.payment, bankToken).then(function (response, status) {
        //     if (response.data.error == null) {
        //         $scope.resultCount++;
        //         console.log("Successfully completed the payment");
        //         var invoiceID = "";
        //         var imageURL = "http://dev.smoothflow.io/app/images/dbf/welcome.jpg";
        //         var orderURL = "https://www.cargillsbank.com/";
        //         if ($scope.payment.invoiceNo != "") { invoiceID = $scope.payment.invoice; } else { invoiceID = "Payed to " + $scope.payment.entity; }
        //         sendReciptToBot(invoiceID, orderURL, imageURL);
        //         console.log("Successfully created the receipt.");
        //     } else {
        //         alert("Error occured when doing the Payment.")
        //     }
        // }, function (response) {
        //     alert("Error occured when doing the Payment.")
        // });

        // // invoice to merchant account
        // $scope.payment.method = "credit";
        // $invoice.createInvoice($scope.user, $scope.payment, merchantToken).then(function (response, status) {
        //     if (response.data.error == null) {
        //         $scope.resultCount++;
        //         console.log("Successfully completed the Invoice.");
        //         var invoiceID = "";
        //         var imageURL = "";
        //         var orderURL = "";
        //         if ($scope.payment.invoiceNo != "") { invoiceID = $scope.payment.invoice; } else { invoiceID = "Payed to " + $scope.payment.entity; }
        //         if ($scope.payment.entity == "ceb") { imageURL = "http://dev.smoothflow.io/app/images/dbf/ceb.jpg"; orderURL = "http://www.ceb.lk/"; } else if ($scope.payment.entity == "odel") { imageURL = "http://dev.smoothflow.io/app/images/dbf/odel.jpg"; orderURL = "http://www.odel.lk/"; } else if ($scope.payment.entity == "dialog") { imageURL = "http://dev.smoothflow.io/app/images/dbf/dialog.jpg"; orderURL = "http://www.dialog.lk/"; }
        //         sendReciptToBot(invoiceID, orderURL, imageURL);
        //         console.log("Successfully created the invoice.");
        //     } else {
        //         alert("Error occured when doing the Invoice.")
        //     }
        // }, function (response) {
        //     alert("Error occured when doing the Invoice.")
        // });
    }

    function sendReciptToBot(invoice, OrderURL, ImageURL) {
        $http({
            method: "POST",
            url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAAQctctsh6UBANUX9Snmt7LB3ZAXXFZBOFsiZAIKUm0oIYoZCxMTjsjGXhcSgO4y492zriId3ceZAZBtliyPCvyNVmS7r3ShFuSZCd2TVQN10ZCQnUuOLhuByY9MruAOCpC8dbTaxZCPig9Y9ZC5dK2i9Tf2StYTWywPWAD8ZAc1tyVsAZDZD",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                "messaging_type": "RESPONSE",
                "recipient": {
                    "id": $scope.user.senderId
                },
                "message": {
                    "attachment": {
                        "type": "template",
                        "payload": {
                            "template_type": "receipt",
                            "recipient_name": $scope.user.name,
                            "order_number": invoice,
                            "currency": "USD",
                            "payment_method": "Visa",
                            "order_url": OrderURL,
                            "timestamp": Math.floor(Date.now() / 1000).toString(),
                            "address": {
                                "street_1": "Cinnamon Gardens",
                                "street_2": "Colombo 07",
                                "city": "Colombo",
                                "postal_code": "11010",
                                "state": "Western Province",
                                "country": "Sri Lanka"
                            },
                            "summary": {
                                "subtotal": $scope.payment.price,
                                "shipping_cost": 0.00,
                                "total_tax": 0.00,
                                "total_cost": $scope.payment.price
                            },
                            "adjustments": [],
                            "elements": [{
                                "title": $scope.payment.entity + " payment",
                                "subtitle": $scope.payment.entity + " payment",
                                "price": $scope.payment.price,
                                "currency": "USD",
                                "image_url": ImageURL
                            }]
                        }
                    }
                }
            }
        }).then(function (response, status) {
            console.log(response);
            console.log("Receipt sent.")
            $scope.isPaymentSuccess = true;
            $scope.processing = false;
            if ($scope.resultCount == 2) {
                $scope.sendQuickReplyToBot();
            }
        }, function (response, status) {
            console.log(response);
            console.log("else.....")
            alert("Error occured when sending the Receipt to Messenger")
            $scope.processing = false;
        });
    }

    $scope.sendQuickReplyToBot = function () {
        $http({
            method: "POST",
            url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAAQctctsh6UBANUX9Snmt7LB3ZAXXFZBOFsiZAIKUm0oIYoZCxMTjsjGXhcSgO4y492zriId3ceZAZBtliyPCvyNVmS7r3ShFuSZCd2TVQN10ZCQnUuOLhuByY9MruAOCpC8dbTaxZCPig9Y9ZC5dK2i9Tf2StYTWywPWAD8ZAc1tyVsAZDZD",
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                "messaging_type": "RESPONSE",
                "recipient": {
                    "id": $scope.user.senderId
                },
                "message": {
                    "text": "Would you like to use another service?",
                    "quick_replies": [
                        {
                            "content_type": "text",
                            "title": "Yes",
                            "payload": "Yes"
                        },
                        {
                            "content_type": "text",
                            "title": "No",
                            "payload": "cancel"
                        }
                    ]
                }
            }
        }).then(function (response, status) {
            console.log(response);
            console.log("Quickreply sent.")
            $scope.isPaymentSuccess = true;
            $scope.processing = false;
        }, function (response, status) {
            console.log(response);
            console.log("else.....")
            alert("Error occured when sending the Receipt to Messenger");
            $scope.processing = false;
        });
    }

    function getProfile(name) {
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
