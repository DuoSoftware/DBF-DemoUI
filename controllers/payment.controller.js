/* use strickt */

app.controller('PaymentController', ['$scope', '$rootScope', '$state', '$timeout', '$http', '$systemUrls', '$helpers', '$invoice', paymentController]);

function paymentController($scope, $rootScope, $state, $timeout, $http, $systemUrls, $helpers, $invoice) {
    console.log("payment page loaded");


    $scope.user = {};
    $scope.payment = { method: "Cash", invoiceNo: "" };
    $scope.isPaymentSuccess = 0;
    $rootScope.processing = true;
    $scope.callAutomationFlow = false;
    $scope.myCart = null;

    if ($state.params && $state.params.name) {
        var name = $state.params.name.split(" ");

        var sender = [""];
        if ($state.params.sender.indexOf(':') >= 0) {
            $scope.SessionID = $state.params.sender;
            sender = $state.params.sender.replace('dbf:', '');
            sender = sender.split(":");
            $scope.botID = sender[0];
            $scope.userID = sender[1];
        } else {
            sender = $state.params.sender.split("-");
        }

        $scope.title = $state.params.title;
        $scope.companyname = $state.params.companyname;
        $scope.companylogolarge = $state.params.companylogolarge;//     https://smoothflow.io/facetone/DBF-DemoUI/img/dialog.png
        $scope.companylogosmall = $state.params.companylogosmall;//     https://smoothflow.io/facetone/DBF-DemoUI/img/dialog.png
        $scope.checkoutbutton = $state.params.checkoutbutton;
        if ($scope.checkoutbutton[$scope.checkoutbutton.length - 1] == "/") {
            $scope.checkoutbutton = $scope.checkoutbutton.substring(0, $scope.checkoutbutton.length - 1);
        }
        $scope.stripdescription = $state.params.stripdescription;
        $scope.stripebutton = $state.params.stripebutton;
        $scope.stripepublishkey = $state.params.stripepublishkey;

        $scope.config = {
            publishKey: $scope.stripepublishkey,
            title: $scope.companyname,
            description: $scope.stripdescription,
            logo: $scope.companylogosmall,
            label: $scope.stripebutton,
            amount: 0,
            currency: ""
        };

        //var sender = $state.params.sender.split("-");

        $scope.user.name = $state.params.name;
        $scope.user.senderId = sender[1] || "";
        $scope.removeCartOncompletion = false;

        $scope.payment.invoiceNo = Math.floor((Math.random() * 10000000) + 1);


        $scope.payment.package = $state.params.package;
        //$scope.payment.totalamount = Math.floor((Math.random() * 10000) + 1);

        // the the page token
        // smooth dialog = EAAMegfEn8iEBAB7DqOh0roEZB3LvjQcxQsGOrGfTpiQLvO7c1EJzsHMqXqkYqmXeaf3ctj1JZAj3h45odjev5MSswAi3JWZAQHolMIxlwSbTzATmIYxxta4wvyLymp0oDDJ0Iw6L4YKPaouadv77gamVf3n1U7ootbluZCZBJTAZDZD
        if ($scope.botID == "5c66bc5cf9c5660c4a14b85f") {
            // Smooth Insurance
            $scope.pageAccessToken = "EAAMegfEn8iEBAP7beeCLwEL36plT7EXJbgqD9Lr9oSURMu2KZBh9ruDsdInXLW8eqZBZBLM9zozZAiNWZCZAdvTOIHra1KQC42gmUb2g8I04hMZA3BqUIT7u5Gq4bkFJUXqpI3CS0LukrzH00IAOm9vXjMGlEi7TX1fCPheG1x4yU0KcVFGNM5Y4cwRHLp1Ef8ZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/smooth%20insurance.jpg";
            $scope.messagetobot = "Insurance payment has been received. Your reference no is XXXXX. Get insured with Smooth Insurance. ";

            $scope.payment.totalamount = 10000;
            $scope.payment.currency = "LKR";
            $scope.payment.name = "Life Saver";
            $scope.payment.tenture = "1 Year of Policy Tenure";
        }
        if ($scope.botID == "5c517f1a24b77186e0297aa4") {
            // Smooth Telecom
            $scope.pageAccessToken = "EAAMegfEn8iEBAKWGxlwNfpaxuZBAh3rLGMv996y58USfG9mcPfW2w60QAutGZBPngFTC4ncqFxnLRG6qyEeZBCb5wZC6W7SH66AfeYZB8M739hXlVQUlLYJEEvk8Qar56JM9RrlysDOrIPAHZBh3cs9JDjZCQct2CLvQvAnLR6ZCjwZDZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/smooth-Telecom.jpg";
            $scope.messagetobot = "Thank you for choosing Smooth Telecom. Your order has been confirmed. A reference has been sent to your mobile. Please visit the chosen branch to collect your order.";

            $scope.payment.totalamount = 0;
            $scope.payment.currency = "LKR";
            $scope.payment.items = [
                {
                    "title": "Smooth Telecom",
                    "subtitle": "",
                    "price": $scope.payment.totalamount,
                    "currency": $scope.payment.currency,
                    "image_url": "https://s3.amazonaws.com/botmediastorage/smooth-Telecom.jpg"
                }
            ]
        }
        if ($scope.botID == "5bc8649c629e48a59214e7cd") {
            // Smooth Apperal
            $scope.pageAccessToken = "EAAMegfEn8iEBAKYf9HSH47JPZAz5i0NRW8HZA2zZCRLCyV8UeC4HUdTkhevS0PU5eFbcS4e1HhWoeuzcvLzjxwvkvBEdZAd1EOVHiZCdOKcTCFVyskUKch6yXlHiJitZCyNWsx7tt5KiCE02xOn1t82QixzYZAEGHZCNWSqV5xMcuAZDZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/SMOOTH%20INSURANCE%20(1).jpg";
            $scope.messagetobot = "Thank you for choosing Smooth Apperal. Your order has been confirmed. A reference has been sent to your mobile. Please visit the chosen branch to collect your order.";

            $scope.payment.totalamount = 175;
            $scope.payment.currency = "USD";
            $scope.payment.items = [
                {
                    "title": "JEAN PANTACOURT DÉCONTRACTÉ",
                    "subtitle": "",
                    "price": 75,
                    "currency": "USD",
                    "image_url": "https://s3.amazonaws.com/botmediastorage/regular_DÉCONTRACTÉ.jpg"
                },
                {
                    "title": "BRILLIANT LIGHTING T-SHIRT",
                    "subtitle": "",
                    "price": 50,
                    "currency": "USD",
                    "image_url": "https://s3.amazonaws.com/botmediastorage/BRILLIANT_LIGHTING_T-SHIRT.jpg"
                },
                {
                    "title": "CHINO TROUSERS NEW",
                    "subtitle": "",
                    "price": 50,
                    "currency": "USD",
                    "image_url": "https://s3.amazonaws.com/botmediastorage/CHINO_TROUSERS_NEW_SHORT_CUT.jpg"
                }
            ]
        }
        if ($scope.botID == "5c94b7fd158f7fa10acf68b8") {
            debugger
            // Smoothflow Cart
            $scope.pageAccessToken = "EAAMegfEn8iEBAM8L6UUo26ttMd9Bc4v0HvS5gdGFVZBttnE3Eax1ZCTisZBQvWIEiKlyOtUwQn6HeNDtNBs0CVXKL2bauRwE8MewhHhdARiMl6wSGEWihpKuet8vCh6ZAdpr9OOvBik7o7drKy9r00JIVacx50ZCHZApemTVnCKQZDZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/1/13/smoothflowlogo.png";
            $scope.messagetobot = "Thank you for choosing Smoothflow Cart. Your order has been confirmed. A reference has been sent to your mobile. Please visit the chosen branch to collect your order.";

            getCartItems($scope.userID)
            $scope.removeCartOncompletion = true;
        }
        if ($scope.botID == "5c94b7fd158f7fa10acf68b8") {
            debugger
            // Smoothflow Cart
            $scope.pageAccessToken = "EAAMegfEn8iEBAM8L6UUo26ttMd9Bc4v0HvS5gdGFVZBttnE3Eax1ZCTisZBQvWIEiKlyOtUwQn6HeNDtNBs0CVXKL2bauRwE8MewhHhdARiMl6wSGEWihpKuet8vCh6ZAdpr9OOvBik7o7drKy9r00JIVacx50ZCHZApemTVnCKQZDZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/1/13/smoothflowlogo.png";
            $scope.messagetobot = "Thank you for choosing Smoothflow Cart. Your order has been confirmed. A reference has been sent to your mobile. Please visit the chosen branch to collect your order.";

            getCartItems($scope.userID)
            $scope.removeCartOncompletion = true;
        }
        if ($scope.botID == "5c8747e6f9c5669f7a151c85") {
            //debugger
            // Smoothflow Cart
            $scope.pageAccessToken = "EAAMegfEn8iEBAEVZAVFTlFdtuI0QVW4okDUqeL1m95UJ1PfJcGC4miPPsWUdXE97RFAXo5CtCBQNehSx63vkRhQNXpHP3yYi8XK1R2Cnxk1sZAjr5KgpOqjtVSZAPMUuZCs90Di09vKqWrJZBEZBgpIwwlWw3gHD17IJO31OEZA8zjAZCRljdWom";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/carelalogo.png";
            $scope.messagetobot = "Thank you for reaching Carela GCC. One of our representative will contact you soon. ";

            getCartItems($scope.userID)
            $scope.removeCartOncompletion = true;
            $scope.callAutomationFlow = true;
            getContextData($scope.SessionID);
        }

        //getProfile($state.params.name);
    }

    $scope.$on('stripe-token-received', function (event, data) {
        $scope.isPaymentSuccess = 1;
        //$rootScope.processing = true;
        $scope.$apply();
        getMakePayment(data);
    });

    $scope.resultCount = 0;
    $scope.pay = function (token) {
        //debugger

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

    // [{
    //     "title": $scope.payment.name,
    //     "subtitle": $scope.payment.tenture + " of Policy Tenure",
    //     "price": $scope.payment.price,
    //     "currency": "LKR",
    //     "image_url": ImageURL
    // }]

    function sendReciptToBot(invoice, OrderURL, ImageURL) {

        // remove qty before sending receipt

        angular.forEach($scope.payment.items, function (item) {
            delete item.qty;
            delete item.id;
        });

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
                            "currency": $scope.payment.currency,
                            "payment_method": "Visa",
                            "order_url": OrderURL,
                            "timestamp": Math.floor(Date.now() / 1000).toString(),
                            "summary": {
                                "subtotal": $scope.payment.totalamount,
                                "shipping_cost": 0.00,
                                "total_tax": 0.00,
                                "total_cost": $scope.payment.totalamount
                            },
                            "adjustments": [],
                            "elements": $scope.payment.items
                        }
                    }
                }
            }
        }).then(function (response, status) {
            console.log(response);
            console.log("Receipt sent.")
            $rootScope.processing = false;
            sendMessageToBot($scope.messagetobot);
            if ($scope.resultCount == 2) {
                $scope.sendQuickReplyToBot();
            }
        }, function (response, status) {
            console.log(response);
            console.log("else.....")
            alert("Error occured when sending the Receipt to Messenger")
            $rootScope.processing = false;
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
            $scope.isPaymentSuccess = 2;
            $rootScope.processing = false;
            if ($scope.resultCount == 2) {
                $scope.sendQuickReplyToBot();
            }
        }, function (response, status) {
            console.log(response);
            console.log("else.....")
            alert("Error occured when sending the Receipt to Messenger")
            $rootScope.processing = false;
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
            $scope.isPaymentSuccess = 1;
            $rootScope.processing = false;
        }, function (response, status) {
            console.log(response);
            console.log("else.....")
            alert("Error occured when sending the Receipt to Messenger");
            $rootScope.processing = false;
        });
    }

    function getProfile(name) {
        $rootScope.processing = true;
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
                $rootScope.processing = false;
            } else {
                alert(response.data.CustomMessage);
                $rootScope.processing = false;
            }
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $rootScope.processing = false;
        });
    }

    function getCartItems(userID) {
        $rootScope.processing = true;
        $http({
            method: "GET",
            url: "https://ylo8l1i5j2.execute-api.us-east-1.amazonaws.com/Prod/cart/" + userID,
            headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            }
        }).then(function (response, status) {
            if (response.data.IsSuccess) {
                $scope.payment.items = [];
                $scope.payment.totalamount = 0;
                if (response.data.Result != null) {
                    $scope.myCart = response.data.Result;
                    angular.forEach($scope.myCart.cartItems, function (item) {
                        var obj = {
                            "id": item.id,
                            "title": item.name,
                            "subtitle": "",
                            "price": parseFloat(item.value),
                            "currency": response.data.Result.rawData.currency,
                            "subtitle": item.shortdescription,
                            "image_url": item.image_url,
                            "qty": parseInt(item.qty)
                        }
                        $scope.payment.items.push(obj);
                        $scope.payment.totalamount += parseFloat(item.value) * parseInt(item.qty);
                    });
                    // setting config currency and amount
                    $scope.config.amount = $scope.payment.totalamount * 100
                    $scope.config.currency = response.data.Result.rawData.currency;
                    $scope.payment.currency = response.data.Result.rawData.currency;
                }
                // update stripe config
                $rootScope.$broadcast('stripe-config-updated', $scope.config);
                $rootScope.processing = false;
                $scope.$apply();
            } else {
                alert(response.data.CustomMessage);
                $rootScope.processing = false;
            }
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $rootScope.processing = false;
        });
    }

    $scope.updatedQty = function (prod) {
        //alert("changed");
        $rootScope.processing = true;
        angular.forEach($scope.myCart.cartItems, function (item) {
            if (item.id == prod.id) {
                item.qty = prod.qty.toString();
            }
        });
        $http({
            method: "PUT",
            url: "https://ylo8l1i5j2.execute-api.us-east-1.amazonaws.com/Prod/cart/" + $scope.userID,
            headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            },
            data: $scope.myCart
        }).then(function (response, status) {
            console.log("Cart is updated");
            getCartItems($scope.userID);
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $rootScope.processing = false;
        });
    }

    function callautomation(sessionID) {
        debugger
        $rootScope.processing = true;
        var payload = {
            "InSessionID": sessionID,
            "SessionData": "{}",
            "InCustName": $scope.contextData.custName,
            "InCustAddress": $scope.contextData.custAddress,
            "InCustMobile": $scope.contextData.custMobile,
            "InCustEmail": $scope.contextData.custEmail
        }
        $http({
            method: "POST",
            url: "https://eshwaranbroscarelaemailconfirmation.plus.smoothflow.io/eshwaranbroscarelaemailconfirmation/smoothflow/Invoke?apikey=",
            headers: {
                "Content-Type": "application/json"
            },
            data: payload
        }).then(function (response, status) {
            console.log("Automation invoked");
            $rootScope.processing = false;
            sendReciptToBot($scope.payment.invoiceNo, $scope.receiptUrl, $scope.receiptImage);
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $rootScope.processing = false;
        });
    }

    function removeCart(userID) {
        $rootScope.processing = true;
        $http({
            method: "DELETE",
            url: "https://ylo8l1i5j2.execute-api.us-east-1.amazonaws.com/Prod/cart/" + userID,
            headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            }
        }).then(function (response, status) {
            console.log("Cart is deleted");
            $rootScope.processing = false;
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $rootScope.processing = false;
        });
    }

    $scope.removenow = function () {
        document.getElementById('id01').style.display = 'none'
        removeFromCart($scope.itemIDtoremove);
    }

    $scope.removeme = function (id) {
        $scope.itemIDtoremove = id;
        document.getElementById('id01').style.display = 'block';
        // if (confirm('Are you sure you want to remove the item from the cart?')) {
        //     removeFromCart(id);
        // }
        $scope.$apply();
    }
    function removeFromCart(id) {
        $rootScope.processing = true;

        var payload = {
            "item": {
                "id": id
            }
        }
        $http({
            method: "PUT",
            url: "https://ylo8l1i5j2.execute-api.us-east-1.amazonaws.com/Prod/removefromcart/" + $scope.userID,
            headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            }
        }).then(function (response, status) {
            console.log("itme is deleted");
            $rootScope.processing = false;
            getCartItems($scope.userID);
        }, function (response, status) {
            alert(response.data.CustomMessage);
            $rootScope.processing = false;
        });
    }

    $scope.contextData = {};
    function getContextData(sessionID) {
        //debugger
        // accepting the session ID like the bellow
        //dbf-5c8747e6f9c5669f7a151c85-2549010211837333
        sessionID = sessionID.replace(':', '-');
        sessionID = sessionID.replace(':', '-');
        $rootScope.processing = true;
        $http({
            method: "GET",
            url: "https://smoothbotdispatcher.plus.smoothflow.io/DBF/API/1.0.0/getContext/" + sessionID,
            headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            }
        }).then(function (response, status) {
            console.log("Context Data retrived.");
            // debugger
            $scope.contextData = response.data.message;
        }, function (response, status) {
            $rootScope.processing = false;
        });
    }

    function getMakePayment(token) {
        //debugger

        var payload = {
            amount: $scope.config.amount,
            currency: $scope.config.currency,
            description: "",
            token: token
        }

        //https://b9d637f4.ngrok.io
        //https://stripepaymentsdev.plus.smoothflow.io
        $http({
            method: "POST",
            url: "https://stripepaymentsdev.plus.smoothflow.io/DBF/API/1/Payments/stripePayment",
            headers: {
                "Content-Type": "application/json"
            },
            data: payload
        }).then(function (response, status) {
            debugger
            if (response.data.IsSuccess) {
                console.log("Payment Confirmation received.");
                callautomation($scope.SessionID)
            } else {
                alert(response.data.Exception.Message);
                $scope.isPaymentSuccess = 0;
            }
        }, function (response, status) {
            $rootScope.processing = false;
            alert(response);
        });
    }
}
