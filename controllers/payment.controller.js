/* use strickt */

app.controller('PaymentController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$invoice', paymentController]);

function paymentController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $invoice) {
    console.log("payment page loaded");

    // smooth dialog = EAAMegfEn8iEBAB7DqOh0roEZB3LvjQcxQsGOrGfTpiQLvO7c1EJzsHMqXqkYqmXeaf3ctj1JZAj3h45odjev5MSswAi3JWZAQHolMIxlwSbTzATmIYxxta4wvyLymp0oDDJ0Iw6L4YKPaouadv77gamVf3n1U7ootbluZCZBJTAZDZD
    $scope.pageAccessToken = "EAAMegfEn8iEBAP7beeCLwEL36plT7EXJbgqD9Lr9oSURMu2KZBh9ruDsdInXLW8eqZBZBLM9zozZAiNWZCZAdvTOIHra1KQC42gmUb2g8I04hMZA3BqUIT7u5Gq4bkFJUXqpI3CS0LukrzH00IAOm9vXjMGlEi7TX1fCPheG1x4yU0KcVFGNM5Y4cwRHLp1Ef8ZD";
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

        //debugger
        $scope.title = $state.params.title;
        $scope.companyname = $state.params.companyname;
        $scope.companylogolarge = $state.params.companylogolarge;//     https://smoothflow.io/facetone/DBF-DemoUI/img/dialog.png
        $scope.companylogosmall = $state.params.companylogosmall;//     https://smoothflow.io/facetone/DBF-DemoUI/img/dialog.png
        $scope.checkoutbutton = $state.params.checkoutbutton;
        $scope.stripdescription = $state.params.stripdescription;
        $scope.stripebutton = $state.params.stripebutton;
        $scope.stripepublishkey = $state.params.stripepublishkey;

        $scope.config = {
            publishKey: $scope.stripepublishkey,
            title: $scope.companyname,
            description: $scope.stripdescription,
            logo: $scope.companylogosmall,
            label: $scope.stripebutton
        };

        //var sender = $state.params.sender.split("-");

        $scope.user.name = $state.params.name;
        $scope.user.senderId = sender[1] || "";

        $scope.payment.invoiceNo = Math.floor((Math.random() * 10000000) + 1);
        $scope.payment.package = $state.params.package;
        $scope.payment.price = 10000;
        $scope.payment.name = "Life Saver";
        $scope.payment.tenture = "1 Year";
        //$scope.payment.price = Math.floor((Math.random() * 10000) + 1);

        //getProfile($state.params.name);
    }

    $scope.$on('stripe-token-received', function (event, args) {
        $scope.processing = true;
        $scope.pay();
    });

    $scope.resultCount = 0;
    $scope.pay = function () {
        debugger
        $scope.isPaymentSuccess = true;
        $scope.processing = false;
        $scope.$apply();
        sendReciptToBot($scope.payment.invoiceNo, "https://www.smoothflow.io/", "https://s3.amazonaws.com/botmediastorage/smooth%20insurance.jpg");
    }

    // 
    // "address": {
    //     "street_1": "No.06, Charles Terrance",
    //     "street_2": "Alfred Terrece, Colombo 07",
    //     "city": "Colombo",
    //     "postal_code": "11010",
    //     "state": "Western Province",
    //     "country": "Sri Lanka"
    // },

    function sendReciptToBot(invoice, OrderURL, ImageURL) {
        $http({
            method: "POST",
            url: "https://graph.facebook.com/v2.6/me/messages?access_token=" + $scope.pageAccessToken,
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
                            "currency": "LKR",
                            "payment_method": "Visa",
                            "order_url": OrderURL,
                            "timestamp": Math.floor(Date.now() / 1000).toString(),
                            "summary": {
                                "subtotal": $scope.payment.price,
                                "shipping_cost": 0.00,
                                "total_tax": 0.00,
                                "total_cost": $scope.payment.price
                            },
                            "adjustments": [],
                            "elements": [{
                                "title": $scope.payment.name,
                                "subtitle": $scope.payment.tenture + " of Policy Tenure",
                                "price": $scope.payment.price,
                                "currency": "LKR",
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
            sendMessageToBot("Thank you for shopping with us. A rference number has been sent to your mobile. Your order will be delivered with in 5 working days. For more info call 0112 500 500.");
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

    function sendMessageToBot(message) {
        $http({
            method: "POST",
            url: "https://graph.facebook.com/v2.6/me/messages?access_token=" + $scope.pageAccessToken,
            headers: {
                "Content-Type": "application/json",
            },
            data: {
                "messaging_type": "RESPONSE",
                "recipient": {
                    "id": $scope.user.senderId
                },
                "message": {
                    "text": message
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
            url: "https://graph.facebook.com/v2.6/me/messages?access_token=EAAZAl88dfILsBANoruPywbZBcp1ZCbZBxyFxfVNHLlW1ddGU7X0pNmbGuKiT93T09oxCm885j9vNnilCb9kCDZCfEurhZCsCiMPNaupZA9BbjcVz94vFfUpnLkMNAw00UHyZAZBULxSSnnelqx3QUEVcZC3i4mfqIqUZCyRZCYTxZCiCcUAZDZD",
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
