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
    $scope.additionalCoverMap = {
        "LADDI_R1" : "Additional Life Cover",
        "LACCID_R1" : "Additional Accident Cover/TPD/PPD",
        "LCRITL_R1" : "Critical Illness",
        "FIB" : "Family Income Benefit Per Month",
        "LHOSPT_R1" : "Hospital Cash Plan Per Day",
        "FUNEX" : "Funeral Expense",
        "HRCL" : "Hospital Reimbursement - Cashless"
    };
    // $scope.additionalCover = [{
    //     "RiderCode": "LADDI_R1",
    //     "PolicyHolder": "LIN",
    //     "MinimumAge": "21",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "",
    //     "BasicSumMultipliedBy": "8",
    //     "MultiplesOf": "10000"
    // }, {
    //     "RiderCode": "LADDI_R1",
    //     "PolicyHolder": "SPU",
    //     "MinimumAge": "21",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "",
    //     "BasicSumMultipliedBy": "8",
    //     "MultiplesOf": "10000"
    // }, {
    //     "RiderCode": "LADDI_R1",
    //     "PolicyHolder": "CHL",
    //     "MinimumAge": "",
    //     "MaximumAge": "",
    //     "MinimumTerm": "",
    //     "MaximumTerm": "",
    //     "MinimumAmount": "",
    //     "MaximumAmount": "",
    //     "BasicSumMultipliedBy": "8",
    //     "MultiplesOf": "10000"
    // }, {
    //     "RiderCode": "LACCID_R1",
    //     "PolicyHolder": "LIN",
    //     "MinimumAge": "21",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "",
    //     "BasicSumMultipliedBy": "6",
    //     "MultiplesOf": "10000"
    // }, {
    //     "RiderCode": "LACCID_R1",
    //     "PolicyHolder": "SPU",
    //     "MinimumAge": "21",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "",
    //     "BasicSumMultipliedBy": "6",
    //     "MultiplesOf": "10000"
    // }, {
    //     "RiderCode": "LACCID_R1",
    //     "PolicyHolder": "CHL",
    //     "MinimumAge": "",
    //     "MaximumAge": "",
    //     "MinimumTerm": "",
    //     "MaximumTerm": "",
    //     "MinimumAmount": "",
    //     "MaximumAmount": "",
    //     "BasicSumMultipliedBy": "6",
    //     "MultiplesOf": "10000"
    // }, {
    //     "RiderCode": "LCRITL_R1",
    //     "PolicyHolder": "LIN",
    //     "MinimumAge": "21",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "5000000",
    //     "BasicSumMultipliedBy": "1",
    //     "MultiplesOf": "10000"
    // }, {
    //     "RiderCode": "LCRITL_R1",
    //     "PolicyHolder": "SPU",
    //     "MinimumAge": "21",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "5000000",
    //     "BasicSumMultipliedBy": "1",
    //     "MultiplesOf": "10000"
    // }, {
    //     "RiderCode": "LCRITL_R1",
    //     "PolicyHolder": "CHL",
    //     "MinimumAge": "1",
    //     "MaximumAge": "17",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "5000000",
    //     "BasicSumMultipliedBy": "1",
    //     "MultiplesOf": "10000"
    // }, {
    //     "RiderCode": "FIB",
    //     "PolicyHolder": "LIN",
    //     "MinimumAge": "21",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "5000",
    //     "MaximumAmount": "100000",
    //     "BasicSumMultipliedBy": "0.025",
    //     "MultiplesOf": "500"
    // }, {
    //     "RiderCode": "FIB",
    //     "PolicyHolder": "SPU",
    //     "MinimumAge": "",
    //     "MaximumAge": "",
    //     "MinimumTerm": "",
    //     "MaximumTerm": "",
    //     "MinimumAmount": "",
    //     "MaximumAmount": "",
    //     "BasicSumMultipliedBy": "",
    //     "MultiplesOf": "500"
    // }, {
    //     "RiderCode": "FIB",
    //     "PolicyHolder": "CHL",
    //     "MinimumAge": "",
    //     "MaximumAge": "",
    //     "MinimumTerm": "",
    //     "MaximumTerm": "",
    //     "MinimumAmount": "",
    //     "MaximumAmount": "",
    //     "BasicSumMultipliedBy": "",
    //     "MultiplesOf": ""
    // }, {
    //     "RiderCode": "LHOSPT_R1",
    //     "PolicyHolder": "LIN",
    //     "MinimumAge": "21",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "1000",
    //     "MaximumAmount": "10000",
    //     "BasicSumMultipliedBy": "0.1",
    //     "MultiplesOf": "100"
    // }, {
    //     "RiderCode": "LHOSPT_R1",
    //     "PolicyHolder": "SPU",
    //     "MinimumAge": "18",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "1,000",
    //     "MaximumAmount": "10000",
    //     "BasicSumMultipliedBy": "0.1",
    //     "MultiplesOf": "100"
    // }, {
    //     "RiderCode": "LHOSPT_R1",
    //     "PolicyHolder": "CHL",
    //     "MinimumAge": "0",
    //     "MaximumAge": "17",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "1,000",
    //     "MaximumAmount": "10000",
    //     "BasicSumMultipliedBy": "0.1",
    //     "MultiplesOf": "100"
    // }, {
    //     "RiderCode": "FUNEX",
    //     "PolicyHolder": "LIN",
    //     "MinimumAge": "18",
    //     "MaximumAge": "54",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "10000",
    //     "MaximumAmount": "100000",
    //     "BasicSumMultipliedBy": "0.1",
    //     "MultiplesOf": "5000"
    // }, {
    //     "RiderCode": "FUNEX",
    //     "PolicyHolder": "SPU",
    //     "MinimumAge": "18",
    //     "MaximumAge": "54",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "10000",
    //     "MaximumAmount": "100000",
    //     "BasicSumMultipliedBy": "0.1",
    //     "MultiplesOf": "5000"
    // }, {
    //     "RiderCode": "FUNEX",
    //     "PolicyHolder": "CHL",
    //     "MinimumAge": "0",
    //     "MaximumAge": "17",
    //     "MinimumTerm": "8",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "10000",
    //     "MaximumAmount": "100000",
    //     "BasicSumMultipliedBy": "0.1",
    //     "MultiplesOf": "5000"
    // }, {
    //     "RiderCode": "HRCL",
    //     "PolicyHolder": "LIN",
    //     "MinimumAge": "21",
    //     "MaximumAge": "59",
    //     "MinimumTerm": "10",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "2000000",
    //     "BasicSumMultipliedBy": "1",
    //     "MultiplesOf": "100000"
    // }, {
    //     "RiderCode": "HRCL",
    //     "PolicyHolder": "SPU",
    //     "MinimumAge": "18",
    //     "MaximumAge": "58",
    //     "MinimumTerm": "10",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "2000000",
    //     "BasicSumMultipliedBy": "1",
    //     "MultiplesOf": "100000"
    // }, {
    //     "RiderCode": "HRCL",
    //     "PolicyHolder": "CHL",
    //     "MinimumAge": "0.5",
    //     "MaximumAge": "17",
    //     "MinimumTerm": "10",
    //     "MaximumTerm": "30",
    //     "MinimumAmount": "100000",
    //     "MaximumAmount": "2000000",
    //     "BasicSumMultipliedBy": "1",
    //     "MultiplesOf": "100000"
    // }];
    $scope.additionalCover = [];

    function setAbandonedState() {
        $http({
            method: "PUT",
            url: `https://9qmfbex9qj.execute-api.us-east-1.amazonaws.com/Prod/cartStatus/${$scope.botID}/${$scope.userID}/false`,
            headers: {
                "Content-Type": "application/json"
            },
            data: payload
        }).then(function (response, status) {
            $scope.isPaymentSuccess = 2;
        }, function (response, status) {
            $scope.isPaymentSuccess = 2;
        });
    }

    $scope.quotation = [];
    function getPremium() {
        $scope.quotation = [{
            name: 'Package 1',
            price: 100
        }, {
            name: 'Package 1',
            price: 100
        }, {
            name: 'Package 1',
            price: 100
        }, {
            name: 'Package 1',
            price: 100
        }, {
            name: 'Package 1',
            price: 100
        }];
        $scope.premiumPackage = {};
    }

    if ($state.params && $state.params.name) {
        var name = $state.params.name.split(" ");

        var sender = [""];
        if ($state.params.sender.indexOf(':') >= 0) {
            $scope.SessionID = $state.params.sender;
            sender = $state.params.sender.replace('dbf:', '');
            sender = sender.split(":");
            $scope.botID = sender[0];
            $scope.userID = sender[1];
            $scope.payment.policy = $state.params.policy;
            $scope.payment.period = $state.params.period;
        } else {
            sender = $state.params.sender.split("-");
        }

        $scope.title = $state.params.title;
        $scope.companyname = $state.params.companyname;
        $scope.companylogolarge = $state.params.companylogolarge;//     https://smoothflow.io/facetone/DBF-DemoUI/img/dialog.png
        $scope.companylogosmall = $state.params.companylogosmall;//     https://smoothflow.io/facetone/DBF-DemoUI/img/dialog.png
        $scope.checkoutbutton = $state.params.checkoutbutton;
        if ($scope.checkoutbutton && $scope.checkoutbutton[$scope.checkoutbutton.length - 1] == "/") {
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
            $scope.pageAccessToken = "EAAMegfEn8iEBAFD0VC8IHRxIRt5SaLKtHWN9SKEsC3udnR6Hual2JvdadWV1ZC4xlNWIZCim17Ecspv1LbDNp9aemzZBAzuGYDphP9hEQNUd2IA1Yz0e4ff1YWDPn1QdDoJLKlo0cSISmZA7GldKPI9pd21ttY5tMMZCYYbmx7Mwhy7NNKsVC7zlHJBx8xhsZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/smooth%20insurance.jpg";
            $scope.messagetobot = "Insurance payment has been received. Your reference no is XXXXX. Get insured with Smooth Insurance. ";

            $scope.payment.totalamount = 10000;
            $scope.payment.currency = "LKR";
            $scope.payment.name = "Health Protector";
            $scope.payment.tenture = "1 Year of Policy Tenure";
            $scope.payment.items = [
                {
                    "title": $scope.payment.name,
                    "subtitle": $scope.payment.tenture,
                    "price": $scope.payment.totalamount,
                    "currency": $scope.payment.currency,
                    "image_url": $scope.receiptImage
                }
            ]
            $rootScope.processing = false;
        }
        if ($scope.botID == "5cac5bb3158f7fabbad05141") {
            // Insurance demo
            $scope.pageAccessToken = "EAAMegfEn8iEBAAo7SgVCuUUbgsddMC8zIgxRhZBgSXilLtWUyhuFYRREEIuIZAZC8H9sbYFG7hAQKybrMwiGhaRnQoDwOZBVVKxM8bLnO6hNeBHQVTmZBhWslZBmFAvqjD4l7iOs9c5nupLG6FqOWqRs6gR8cROivxlBfiC0Bs7Qgza7WLcxFUGLtP3uuCwlgZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/smooth%20insurance.jpg";
            $scope.messagetobot = "Insurance payment has been received. Your reference no is XXXXX. Get insured with Smooth Insurance. ";

            // $scope.annualAmt = 0;
            // $scope.halfYearAmt = $scope.annualAmt/2;
            // $scope.quartYearAmt = $scope.annualAmt/4;

            $scope.payment.totalamount = 0;
            $scope.payment.currency = "LKR";
            $scope.payment.name = "Good Health";
            $scope.payment.tenture = "1 Year of Policy Tenure";
            $scope.payment.items = [
                {
                    "title": $scope.payment.name,
                    "subtitle": $scope.payment.tenture,
                    "price": $scope.payment.totalamount,
                    "currency": $scope.payment.currency,
                    "image_url": $scope.receiptImage
                }
            ]
            $rootScope.processing = false;

        }
        if ($scope.botID == "5cfdf9dcb855a87edbd756ac") {
            // Smooth Telecom
            $scope.pageAccessToken = "EAAMegfEn8iEBADwZBU6CsEv5uBl4NMXjKe6Xh3X53Kyhbtd4hQNiyvf86WXjTtR1uaxbfqSlmxoZAjuZBsUZBU9QddcgWDyQYSf5vdjJSDCLfE1fae43BcA3DN02sn3ARfAbPUaOb01PuKGGRf5gmdf7ZChGnEUtEErfxES9ZBEgZDZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/smooth-Telecom.jpg";
            $scope.messagetobot = "Thank you for choosing Sri Lanka Telecom. Your order has been confirmed. A reference has been sent to your mobile. Please visit the chosen branch to collect your order.";

            getCartItems($scope.userID)
            $scope.removeCartOncompletion = true;
            $scope.callAutomationFlow = true;
            getContextData($scope.SessionID);
        }
        if ($scope.botID == "5cfa4cd8aa087d1136c7e6c0") {
            debugger
            // Smooth Apperal
            $scope.pageAccessToken = "EAAMegfEn8iEBACZCkddYgddkBUFytZCt4rzBat2MB5n3z5woEHYI7hknxos7nAfAOIl8q78Gxvd0dDI2KZCjibZBjrvPObyUpi1deYh82WUPGaMgTxpGP37IntJwEWMJdVEVwOiH1ZBIcbhbOEnJiI1LFx3YNIQHfF6YMpxqRFVYgZCd3dBQUj";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/SMOOTH%20INSURANCE%20(1).jpg";
            $scope.messagetobot = "Thank you for choosing Smooth Apperal. Your order has been confirmed. A reference has been sent to your mobile. Please visit the chosen branch to collect your order.";

            getCartItems($scope.userID)
            $scope.removeCartOncompletion = true;
            $scope.callAutomationFlow = true;
            getContextData($scope.SessionID);
        }
        if ($scope.botID == "5cf8f455b3bddfc7f663af82") {
            debugger
            // Smooth Pizza
            $scope.pageAccessToken = "EAAMegfEn8iEBACVdEdX5ia9cRYbKRfDFZCZADm6uJqypjohTDfC8eTsRF9lWCVzYB4fLHFt5KsTbYi0Fwim6RK1O7LZB5and7dZASdZBdwU55KZA9aAmsyPrEQoUmZAGwRyRV2T0q7OtRPDyqHHi44GuZBYPLaWX342zfUULLZApGzbqYuEMvjWuf";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/1/13/smoothflowlogo.png";
            $scope.messagetobot = "Thank you for choosing Smooth Pizza. Your order has been confirmed. A reference has been sent to your mobile. Please visit the chosen branch to collect your order.";

            getCartItems($scope.userID);
            $scope.removeCartOncompletion = true;
            $scope.callAutomationFlow = true;
            getContextData($scope.SessionID);
        }
        if ($scope.botID == "5c94b7fd158f7fa10acf68b8") {
            debugger
            // Smoothflow Cart
            $scope.pageAccessToken = "EAAMegfEn8iEBAM8L6UUo26ttMd9Bc4v0HvS5gdGFVZBttnE3Eax1ZCTisZBQvWIEiKlyOtUwQn6HeNDtNBs0CVXKL2bauRwE8MewhHhdARiMl6wSGEWihpKuet8vCh6ZAdpr9OOvBik7o7drKy9r00JIVacx50ZCHZApemTVnCKQZDZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/1/13/smoothflowlogo.png";
            $scope.messagetobot = "Thank you for choosing Smoothflow Cart. Your order has been confirmed. A reference has been sent to your mobile. Please visit the chosen branch to collect your order.";

            getCartItems($scope.userID);
            $scope.removeCartOncompletion = true;
        }
        if ($scope.botID == "5c8747e6f9c5669f7a151c85") {
            //debugger
            // Carlla GCC
            $scope.pageAccessToken = "EAAMegfEn8iEBAEVZAVFTlFdtuI0QVW4okDUqeL1m95UJ1PfJcGC4miPPsWUdXE97RFAXo5CtCBQNehSx63vkRhQNXpHP3yYi8XK1R2Cnxk1sZAjr5KgpOqjtVSZAPMUuZCs90Di09vKqWrJZBEZBgpIwwlWw3gHD17IJO31OEZA8zjAZCRljdWom";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "https://s3.amazonaws.com/botmediastorage/carelalogo.png";
            $scope.messagetobot = "Thank you for reaching Carela GCC. One of our representative will contact you soon. ";

            getCartItems($scope.userID)
            $scope.removeCartOncompletion = true;
            $scope.callAutomationFlow = true;
            getContextData($scope.SessionID);
        }
        if ($scope.botID == "5cac5bb3158f7fabbad05141") {
            //debugger
            // Carlla GCC
            $scope.pageAccessToken = "EAAMegfEn8iEBAEVZAVFTlFdtuI0QVW4okDUqeL1m95UJ1PfJcGC4miPPsWUdXE97RFAXo5CtCBQNehSx63vkRhQNXpHP3yYi8XK1R2Cnxk1sZAjr5KgpOqjtVSZAPMUuZCs90Di09vKqWrJZBEZBgpIwwlWw3gHD17IJO31OEZA8zjAZCRljdWom";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "http://www.fidaglobal.com/images/clients/janashakthi.png";
            $scope.messagetobot = "Thank you for reaching Carela GCC. One of our representative will contact you soon. ";

            getCartItems($scope.userID);
            $scope.removeCartOncompletion = true;
            $scope.callAutomationFlow = true;
            getContextData($scope.SessionID);
            $scope.payment.additionalCover = [];
        }
        if ($scope.botID == "5d41705b7ef9df644f4eb0d8") {
            //debugger
            // Carlla GCC
            $scope.pageAccessToken = "EAAMegfEn8iEBAGX27rOTZAMnqAH3NMYDvUrkZBHnxZCZAzBhy8Nopr6qyG8XyvoNSKmt5LfZCTiWn69RmfZAJbQSPnnNwU0DGtVR8UZBalVMAInJbA0ZCxSrnakY7YXtWNUnydLdwwQTQPmBGEyYu18XAAl3Mp3ZB7YwuhZCVyBEnABAZDZD";
            $scope.receiptUrl = "https://www.smoothflow.io/";
            $scope.receiptImage = "http://www.fidaglobal.com/images/clients/janashakthi.png";
            $scope.messagetobot = "Thank you for reaching Janashakthi. One of our representative will contact you soon. ";

            getCartItems($scope.userID);
            $scope.removeCartOncompletion = true;
            $scope.callAutomationFlow = true;
            getContextData($scope.SessionID);
            $scope.payment.additionalCover = [];
        }

        //getProfile($state.params.name);

        if ($state.current.name === "get_quote") {
            getPremium();
        }
    }

    $scope.$on('stripe-token-received', function (event, data) {
        debugger
        if ($scope.botID == "5c8747e6f9c5669f7a151c85") {
            $scope.isPaymentSuccess = 1;
            //$rootScope.processing = true;
            $scope.$apply();
            getMakePayment(data);
        }
        if ($scope.botID == "5c66bc5cf9c5660c4a14b85f" ||
            $scope.botID == "5cac5bb3158f7fabbad05141" ||
            $scope.botID == "5cfa4cd8aa087d1136c7e6c0" ||
            $scope.botID == "5cf8f455b3bddfc7f663af82" ||
            $scope.botID == "5d41705b7ef9df644f4eb0d8" ||
            $scope.botID == "5cfdf9dcb855a87edbd756ac"
        ) {
            $scope.isPaymentSuccess = 1;
            sendReciptToBot($scope.payment.invoiceNo, $scope.receiptUrl, $scope.receiptImage);
        }
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
            $rootScope.processing = false;
            if($scope.removeCartOncompletion){
                removeCart($scope.userID);
            }
            if ($scope.resultCount == 2) {
                $scope.sendQuickReplyToBot();
            }
            setAbandonedState();
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
            url: "https://7b69tvp6cj.execute-api.us-east-1.amazonaws.com/Prod/cart/" + userID,
            headers: {
                "x-api-key": "XcY9lhgnud1JUum05XFT02r37wagFtOLdCH7RKz8",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            }
        })
            .then(function (response, status) {
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
                        };
                        $scope.payment.items.push(obj);
                        $scope.payment.totalamount += parseFloat(item.price) * parseInt(item.qty);

                        if(item.type && item.type == 'additional_cover') {
                            $scope.payment.additionalCover.push(item);
                            $scope.payment.totalamount += item.price;
                        }
                    });
                    // setting config currency and amount
                    $scope.config.amount = $scope.payment.totalamount * 100;

                    $scope.tentureOpt1 = $scope.payment.totalamount;
                    $scope.tentureOpt2 = $scope.tentureOpt1/2;
                    $scope.tentureOpt3 = $scope.tentureOpt1/4;

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

    function updateCart(payload) {
        return $http({
            method: "PUT",
            url: "https://7b69tvp6cj.execute-api.us-east-1.amazonaws.com/Prod/cart/" + $scope.userID,
            headers: {
                "x-api-key": "XcY9lhgnud1JUum05XFT02r37wagFtOLdCH7RKz8",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            },
            data: payload
        });
    }

    $scope.updatedQty = function (prod) {
        //alert("changed");
        if (prod.qty == "0" || prod.qty == "" || prod.qty == null) {
            return
        }
        $rootScope.processing = true;
        angular.forEach($scope.myCart.cartItems, function (item) {
            if (item.id == prod.id) {
                item.qty = prod.qty.toString();
            }
        });
        $http({
            method: "PUT",
            url: "https://7b69tvp6cj.execute-api.us-east-1.amazonaws.com/Prod/cart/" + $scope.userID,
            headers: {
                "x-api-key": "XcY9lhgnud1JUum05XFT02r37wagFtOLdCH7RKz8",
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
            url: "https://222245carelaemailconfirmation.plus.smoothflow.io/222245carelaemailconfirmation/smoothflow/Invoke?apikey=",
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
            url: "https://7b69tvp6cj.execute-api.us-east-1.amazonaws.com/Prod/cart/" + userID,
            headers: {
                "x-api-key": "XcY9lhgnud1JUum05XFT02r37wagFtOLdCH7RKz8",
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
            url: "https://7b69tvp6cj.execute-api.us-east-1.amazonaws.com/Prod/removefromcart/" + $scope.userID,
            headers: {
                "x-api-key": "XcY9lhgnud1JUum05XFT02r37wagFtOLdCH7RKz8",
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
    $scope.insured_people = "";
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
            $scope.additionalCover = $scope.contextData['limitations'];
            $scope.payment.annually = $scope.contextData.premium ? $scope.contextData.premium['premium_annual'] : '';
            $scope.payment.half_yearly = $scope.contextData.premium ? $scope.contextData.premium['premium_half_year'] : '';
            $scope.payment.quarterly = $scope.contextData.premium ? $scope.contextData.premium['premium_quarter'] : '';
            $scope.payment.monthly = $scope.contextData.premium ? $scope.contextData.premium['premium_month'] : '';
            $scope.basic_cover = $scope.contextData.Insure_amount;
            $scope.insured_people = $scope.contextData.insuredPeople;
        }, function (response, status) {
            $rootScope.processing = false;
        });
    }
    function setContextData(sessionID, payload) {
        //debugger
        // accepting the session ID like the bellow
        //dbf-5c8747e6f9c5669f7a151c85-2549010211837333
        sessionID = sessionID.replace(':', '-');
        sessionID = sessionID.replace(':', '-');
        $rootScope.processing = true;
        return $http({
            method: "POST",
            url: "https://smoothbotdispatcher.plus.smoothflow.io/DBF/API/1.0.0/setContext/" + sessionID +"/" + 'riders',
            headers: {
                "Authorization": "bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                "Content-Type": "application/json",
                "companyInfo": "1:103"
            },
            data: {
                "value": payload
            }
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

    $scope.add_cover_amount = 0;
    $scope.genValidationsForAddCover = function () {
        // var package = $scope.contextData.Package_codes;
        // $scope.ridersToGo = $scope.contextData[package];
        $scope.basic_cover = $scope.contextData.Insure_amount;
        // $scope.basic_cover = 100000;

        angular.forEach($scope.additionalCover, function (c) {
            if (
                c.MinimumAmount === "" &&
                c.MaximumAmount === "" &&
                c.MultiplesOf === "" &&
                c.BasicSumMultipliedBy === ""
            ) {
                c.PolicyHolder = null;
            }
            c.userval = 0;
        })
    };
    $scope.genValidationsForAddCover();

    // $scope.submitAdditionalCover = function (e) {
    //     e.preventDefault();
    //     var form = $(e.target).serializeArray();
    //     var isempty = $scope.additionalCover.filter(function (value) {
    //         if(value.selected) return value;
    //     });
    //     if (isempty.length) {
    //         $scope.processingAddCover = true;
    //         $http({
    //             method: "GET",
    //             url: "https://7b69tvp6cj.execute-api.us-east-1.amazonaws.com/Prod/cart/" + $scope.userID,
    //             headers: {
    //                 "x-api-key": "XcY9lhgnud1JUum05XFT02r37wagFtOLdCH7RKz8",
    //                 "Content-Type": "application/json",
    //                 "companyInfo": "1:103"
    //             }
    //         }).then(function (response, status) {
    //             if (response.data.IsSuccess) {
    //                 var items = response.data.Result;
    //                 var payload = {
    //                     "userID": $scope.userID,
    //                     "cartItems": [],
    //                     "rawData": {
    //                         currency: "USD"
    //                     }
    //                 };
    //                 angular.forEach($scope.additionalCover, function (item) {
    //                     if (item.selected) {
    //                         payload.cartItems.push({
    //                             "id": '',
    //                             "title": item.name,
    //                             "subtitle": "",
    //                             "price": parseFloat(item.value),
    //                             "image_url": '',
    //                             "qty": 1,
    //                             "type": 'additional_cover'
    //                         });
    //                     }
    //                 });
    //                 updateCart(payload)
    //                     .then(function (response, status) {
    //                         if (response.data.IsSuccess) {
    //                             $scope.processingAddCover = false;
    //                             $scope.isAddCoverSuccess = true;
    //                         }
    //                     }, function (response, status) {
    //                         alert(response.data.CustomMessage);
    //                         $scope.processingAddCover = false;
    //                     });
    //             }
    //         });
    //     } else {
    //         alert('Please select an item');
    //     }
    // };
    $scope.isAdditionalCompleted = false;
    $scope.additionalCoverToContext = function (e) {
        var additionalCovers = {
            LIN: {},
            SPU: {},
            CHL: {}
        };
        e.preventDefault();
        if ($scope.additionalCoverForm.$valid) {
            $rootScope.processing = true;
            var form = $(e.target).serializeArray();
            angular.forEach(form, function (c) {
                additionalCovers[c.name.split('_').pop()][c.name] = parseInt(c.value);
            });
            setContextData($scope.SessionID, additionalCovers)
                .then(function (response, status) {
                    console.log("Context Data updated.");
                    $rootScope.processing = false;
                    $scope.isAdditionalCompleted = true;
                }, function (response, status) {
                    $rootScope.processing = false;
                });
        } else {
            alert("Invalid inputs");
        }
    };
    $scope.setForm = function (form) {
        $scope.additionalCoverForm = form;
    }
}

app.directive('validateCover', function () {
    return {
        restrict: 'EAA',
        scope: {
            cover: '=',
            basic: '=',
            currency: '=',
            userval: '=',
            pform: '='
        },
        templateUrl: './partials/cover-input-template.html',
        link: function (scope, iElement) {
            scope.coverValue = null;
            scope.errorMsg = '';
            scope.minAmount = null;
            scope.maxAmount = null;
            scope.validating = false;

            function setMinAmount() {
                if (scope.cover.MinimumAmount !== "") {
                    scope.minAmount = parseInt(scope.cover.MinimumAmount);
                }
            }

            function setMaxAmount() {
                var sbasmul = scope.cover.BasicSumMultipliedBy;
                var smax = scope.cover.MaximumAmount;
                var submax = 0;

                if (smax !== "") {
                    submax = parseInt(smax.replace(/,/g, ''));
                }
                if (sbasmul !== "") {
                    var ma = parseFloat(sbasmul) * parseInt(scope.basic);
                    if (submax > 0) {
                        if (ma < submax) {
                            submax = ma;
                        }
                    } else {
                        submax = ma;
                    }
                }
                scope.maxAmount = submax;
            }

            (function () {
                setMaxAmount();
                setMinAmount();
                scope.coverValue = 0;
            })();
            
            function multiplesOf() {
                 var x = scope.coverValue % parseInt(scope.cover.MultiplesOf.replace(/,/g, ''));
                 return x;
            }

            scope.validateInput = function (el) {
                var f = scope.pform[scope.cover.RiderCode+'_'+scope.cover.PolicyHolder];
                if (!scope.coverValue) {
                    scope.errorMsg = '';
                    f.$setValidity("invalid", true);
                } else if (scope.coverValue > scope.maxAmount) {
                    scope.errorMsg = 'Maximum value is ' + scope.maxAmount;
                    f.$setValidity("invalid", false);
                } else if (scope.coverValue < scope.minAmount) {
                    scope.errorMsg = 'Minimum value is ' + scope.minAmount;
                    f.$setValidity("invalid", false);
                } else if (multiplesOf() > 0) {
                    scope.errorMsg = 'Amount should be dividable by ' + scope.cover.MultiplesOf;
                    f.$setValidity("invalid", false);
                } else {
                    scope.errorMsg = '';
                    f.$setValidity("invalid", true);
                }
                scope.userval = scope.coverValue;
            };

        }
    }
});

