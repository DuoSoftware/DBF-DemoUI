(function (uik) {

    var _cookMan = (function () {
        function createCookie(name, value, days) {
            if (days) {
                var date = new Date();
                date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
                var expires = "; expires=" + date.toGMTString();
            } else var expires = "";
            document.cookie = name + "=" + value + expires + ";path=/";
        }

        return {
            set: function (name, value, days) {
                createCookie(name, value, days);
            },
            get: function (name) {
                var nameEQ = name + "=";
                var ca = document.cookie.split(';');
                for (var i = 0; i < ca.length; i++) {
                    var c = ca[i];
                    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
                    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
                }
                return null;
            },
            delete: function (name) {
                createCookie(name, "", -1);
            }
        };
    })();


    uik.factory('$helpers', function ($rootScope) {

        function AsyncTask(action, success, fail) {

            var actionFunc = action;
            var successFunc = success;
            var failFunc = fail;

            function start(data, taskObject) {
                actionFunc(data, taskObject);
            }

            var taskObject = {
                start: function (data) {
                    start(data, taskObject);
                },
                endError: function (data) {
                    $rootScope.$apply(function () {
                        failFunc(data);
                    });
                },
                endSuccess: function (data) {
                    $rootScope.$apply(function () {
                        successFunc(data);
                    });
                }
            };

            return taskObject;

        }

        function task(actionFunc, successFunc, failFunc, inputs) {
            var newTask = new AsyncTask(actionFunc, successFunc, failFunc);
            newTask.start(inputs);
        }

        return {
            task: function (actionFunc, successFunc, failFunc) {
                task(actionFunc, successFunc, failFunc);
            },
            safeApply: function (fn) {
                if (fn && typeof fn === 'function') {
                    var phase = $rootScope.$$phase;
                    if (phase == '$apply' || phase == '$digest') fn();
                    else $rootScope.$apply(function () {
                        fn();
                    });
                }
            },
            getCookie: function (name) {
                return _cookMan.get(name);
            },
            setCookie: function (name, value, days) {
                _cookMan.set(name, value, days);
            },
            removeCookie: function (name) {
                _cookMan.delete(name);
            },
            getHash: function (data) {
                return _hashMan.hash(data);
            },
            getHost: function () {
                return getHost();
            },
            getTimeStamp: function () {
                var now = new Date();
                return ("" + now.getYear() + now.getMonth() + now.getDate() + now.getHours() + now.getMinutes() + now.getSeconds() + now.getMilliseconds());
            }
        }

    });

    uik.factory('$auth', function ($http, $v6urls, $backdoor, $rootScope, $helpers) {

        var sessionInfo;
        var userName;
        var securityToken;
        var onLoggedInResultEvent;

        function validateEmail(email) {
            var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        }

        function logout() {

            $http({
                method: 'GET',
                url: $v6urls.auth + "/LogOut/" + securityToken,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }).
                success(function (data, status, headers, config) {
                    _cookMan.delete("securityToken");
                    _cookMan.delete("authData");
                    $rootScope.$emit("auth_onLogout", {});

                }).
                error(function (data, status, headers, config) {
                    $backdoor.log("Auth service returned an error when logging out.");
                    $backdoor.log(data);

                    _cookMan.delete("securityToken");
                    _cookMan.delete("authData");
                    $rootScope.$emit("auth_onLogout", {});

                    //$rootScope.$emit("auth_onLogoutError", {isSuccess:false, message:""});
                });
        }

        return {
            login: function (username, password, domain) {
                login(username, password, domain)
            },
            logout: function () {
                logout();
            },
            onLogoutSuccess: function (func) {
                $rootScope.$on("auth_onLogout", func);
            },
            onLogoutError: function (func) {
                $rootScope.$on("auth_onLogoutError", func);
            },
            onLoginError: function (func) {
                $rootScope.$on("auth_onLoginError", func);
            },
            onLoginResult: function (func) {
                $rootScope.$on("auth_onLogin", func);
            },
            getSecurityToken: function () {
                if (securityToken) return securityToken;
                else return "N/A";
            },
            getUserName: function () {
                if (userName) return userName;
                else {
                    userName = $helpers.getTimeStamp();
                    return userName;
                }
            },
            setUserName: function (username) {
                if (username) {
                    userName = username;
                    return true;
                }
                else {
                    return false;
                }
            },
            getSession: function () {
                return sessionInfo;
            },
            forceLogin: function (username, password, domain) {
                userName = username;
                var loginResult = {}
                loginResult.details = {};

                loginResult.securityToken = $helpers.getTimeStamp();

                sessionInfo = loginResult.details;
                securityToken = loginResult.securityToken;

                _cookMan.set("securityToken", securityToken, 1);
                _cookMan.set("authData", "{}", 1);

                $rootScope.$emit("auth_onLogin", loginResult);

            },
            checkSession: function () {
                securityToken = _cookMan.get("securityToken");
                sessionInfo = _cookMan.get("appData");

                if (sessionInfo) {
                    // sessionInfo = JSON.parse(decodeURIComponent(sessionInfo));
                    // userName = sessionInfo.Username;
                }

                console.log("DEBUG : CheckSession - " + securityToken);
                console.log("DEBUG : sessionInfo - " + sessionInfo);
                //console.log("DEBUG : userName - " + userName);

                if (securityToken == null) {
                    var nagivateUrl = window.location.protocol + "//" + getHost() + "/s.php?r=" + location.href;
                    location.href = nagivateUrl;
                }

                return securityToken != null;
            }
        }
    });

    uik.factory('$profile', function ($http, $systemUrls) {

        function createProfileOnCloudcharge (profile, subscriptionKey) {
            var URL = $systemUrls.cloudcharge + "/profile/insert";
            var payload = { 
                email: profile.email || "", 
                firstName: profile.fname || "",
                lastName: profile.lname || "",
                country: "Sri Lanka",
            };

            return $http({
                method: "POST",
                url: URL,
                data: payload,
                headers: {
                    "Ocp-Apim-Subscription-Key": subscriptionKey || "", 
                    "Content-Type": "application/json",
                    "mode": "sandbox"
                }
            });
        }

        function createProfileOnFacetone (profile) {
            var URL = $systemUrls.userService + "/ExternalUser";
            var payload = { 
                email: profile.email || "",
                name: profile.name || "",
                title: "Mr",
                firstname: profile.fname || "",
                lastname: profile.lname || "",
                phone: profile.mobile || "",
                ssn: "",
                address: {},
                contacts : [ 
                    {
                        contact : profile.name || "",
                        type : "facebook",
                        verified : true
                    }
                ],
                custom_fields:[
                    {"key":"bank", "value": ""},
                    {"key":"odel", "value": ""},
                    {"key":"dialog", "value": ""},
                    {"key":"ceb", "value": ""}
                ]
            };

            return $http({
                method: "POST",
                url: URL,
                data: payload,
                headers: {
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                    "Content-Type": "application/json",
                    "companyInfo": "1:103"
                }
            });
        }

        function registerWithBank (profile) {
            createProfileOnCloudcharge(profile, '1602f50e37134d0e9b3432960c07038f');
        }

        function registerWithMerchant (profile) { 
            createProfileOnCloudcharge(profile, '7002abf4-2675-4b98-8cbf-eb8b37c6ba46,odelinv.app.cloudcharge.com');
        }

        function registerWithTelecommunicationProvider (profile) {
            createProfileOnCloudcharge(profile, 'a461fcc8-82d0-4a57-894d-0a70bc1c9504,dialoginv.app.cloudcharge.com');
        }

        function registerWithUtilityProvider (profile) {
            createProfileOnCloudcharge(profile, '54fd39f4-dd3e-4396-901b-d336ee03d13b,cebinv.app.cloudcharge.com');
        }
        
        return {
            onCloudcharge: {
                registerWithBank: registerWithBank,
                registerWithMerchant: registerWithMerchant,
                registerWithTelecommunicationProvider: registerWithTelecommunicationProvider,
                registerWithUtilityProvider: registerWithUtilityProvider,
            },
            onFacetone: {
                registerProfile: createProfileOnFacetone
            }
        }
    });

    uik.factory('$invoice', function ($http, $systemUrls) {

        function createRecipt (profile, payment) {
            var URL = $systemUrls.reciptService + "/invoicepay/createReceipt";
            var payload = { 
                email: profile.email || "", 
                amount: payment.amount || 0,
                paymentMethod: payment.method || "Cash",
                guInvoiceId : payment.invoiceNo || ""
            };

            return $http({
                method: "POST",
                url: URL,
                data: payload,
                headers: {
                    "Content-Type": "application/json",
                    "securityToken": "12c95918-17d6-4ab7-a1cb-933afee648c0,bank.app.cloudcharge.com"
                }
            });
        }
        
        return {
            createRecipt: createRecipt,
        }
    });

    uik.factory('$otp', function ($http, $systemUrls) {

        function sendOTPCode (mobile) {
            var URL = $systemUrls.otpService + "/send";
            var COUNTRYCODE = '+94';
            var verifyingMobile = "";

            if (!mobile) { return; } 
            else { verifyingMobile = mobile; } 

            if (!verifyingMobile.startsWith(COUNTRYCODE)) { verifyingMobile = COUNTRYCODE + verifyingMobile; }

            var payload = { "mobile": verifyingMobile }
            return $http({
                method: "POST",
                url: URL,
                data: payload,
                headers: {
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                    "Content-Type": "application/json",
                    "companyInfo": "1:103"
                }
            });
        }

        function verifyOTPCode (mobile, code) {
            var URL = $systemUrls.otpService + "/validate";
            var COUNTRYCODE = '+94';
            var verifyingMobile = "";

            if (!mobile) { return; } 
            else { verifyingMobile = mobile; } 

            if (!verifyingMobile.startsWith(COUNTRYCODE)) { verifyingMobile = COUNTRYCODE + verifyingMobile; }

            var payload = { "mobile": verifyingMobile, "code": code || "" }
            return $http({
                method: "POST",
                url: URL,
                data: payload,
                headers: {
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdWtpdGhhIiwianRpIjoiYWEzOGRmZWYtNDFhOC00MWUyLTgwMzktOTJjZTY0YjM4ZDFmIiwic3ViIjoiNTZhOWU3NTlmYjA3MTkwN2EwMDAwMDAxMjVkOWU4MGI1YzdjNGY5ODQ2NmY5MjExNzk2ZWJmNDMiLCJleHAiOjE5MDIzODExMTgsInRlbmFudCI6LTEsImNvbXBhbnkiOi0xLCJzY29wZSI6W3sicmVzb3VyY2UiOiJhbGwiLCJhY3Rpb25zIjoiYWxsIn1dLCJpYXQiOjE0NzAzODExMTh9.Gmlu00Uj66Fzts-w6qEwNUz46XYGzE8wHUhAJOFtiRo",
                    "Content-Type": "application/json",
                    "companyInfo": "1:103"
                }
            });
        }

        return {
            send: sendOTPCode, 
            verify: verifyOTPCode
        };
    });

    uik.factory('$systemUrls', function () {
        var p = location.protocol;
        return {
            userService: p + "//localhost:3535/api/users",
            emailService: p + "//localhost:3535/api/verification",
            otpService: "https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/OTPServiceStandAlone/OTP",
            invoiceService: "https://smoothbotservicesdev.plus.smoothflow.io/DBF/API/1.0.0.0/InvoiceSevice",
            reciptService: "https://app.cloudcharge.com/services/duosoftware.InvoicingAPI",
            cloudcharge: "https://cloudchargedev.azure-api.net",
            userService: "https://userservice.plus.smoothflow.io/DVP/API/1.0.0.0",
            botConnector: {
                facebook: "https://smoothbotdev.plus.smoothflow.io/fb/DBF/API/v1/BotConnector/Platform/fb/Demo"
            }
        };
    });

})(angular.module('uiKernel', []))
