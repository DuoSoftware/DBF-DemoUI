/*
	- Stripe Payemnt Tool -
		Version 1.0.1
*/

(function (spt) {

	spt.directive('stripePayment', ['$window', function ($window) {
		return {
			restrict: 'A',
			scope: {
				config: '=stripePayment',
				isNewCard: '@newCard',
				walletId: '=walletId'
			},
			controller: ['$scope', '$rootScope', function ($scope, $rootScope) {

				$scope.showConfirm = function (tittle, label, okbutton, cancelbutton, content, OkCallback, CancelCallBack, okObj) {

					(new PNotify({
						title: tittle,
						text: content,
						icon: 'glyphicon glyphicon-question-sign',
						hide: false,
						confirm: {
							confirm: true
						},
						buttons: {
							closer: false,
							sticker: false
						},
						history: {
							history: false
						}
					})).get().on('pnotify.confirm', function () {
						OkCallback(true);
					}).on('pnotify.cancel', function () {
						OkCallback(false);
					});

				};


				$scope.showError = function (tittle, content) {
					new PNotify({
						title: tittle,
						text: content,
						type: 'error',
						styling: 'bootstrap3'
					});
				};

				$scope.showAlert = function (tittle, content) {

					new PNotify({
						title: tittle,
						text: content,
						type: 'success',
						styling: 'bootstrap3'
					});
				};

				var config = $scope.config;
				if (!config.hasOwnProperty('publishKey')) {
					console.error("Stripe api key not provided."); return;
				}

				$rootScope.$on('stripe-config-updated', function (data) {
					var config = data;
					$scope.setConfiguration();
				});

				var handler = {};

				$scope.setConfiguration = function () {
					handler = (function () {

						var handler = StripeCheckout.configure({
							key: config.publishKey,
							image: config.logo,
							locale: 'auto',
							panelLabel: config.label,
							currency: config.currency,
							token: function (token) {
								if ($scope.isNewCard === 'true') {
									walletService.CreateWallet(token.id, token.email).then(function (result) {
										if (result) {
											$scope.showAlert("Credit", "Wallet Create Successfully. Please add Some Credit to your wallet.");
											$rootScope.$broadcast('stripe-token-received', token.id);
										} else {
											$scope.showError("Credit", "Fail To Create Wallet.");
										}

									}, function (err) {
										$scope.showError("Credit", "Fail To Create Wallet.");
									});
								}
								else {
									$rootScope.$broadcast('stripe-token-received', token.id);
								}
							}
						});

						var open = function (ev) {
							handler.open({
								name: config.title,
								description: config.description,
								amount: config.amount
							});

							ev.preventDefault();
						};

						var close = function () {
							handler.close();
						};

						return {
							open: open,
							close: close
						}

					})();

					$scope.open = handler.open;
					$scope.close = handler.close;
				}
				$scope.setConfiguration();
			}],
			link: function (scope, element, attrs) {
				element.bind('click', function (ev) {
					scope.open(ev);
				});

				angular.element($window).on('popstate', function () {
					scope.close();
				});

			}
		};

	}])

})(angular.module('stripe-payment-tools', []));

/*
	How to use
	----------

	first include these dependencies to your script.
		-	angular.min.js
				<script type="text/javascript" src="angular.min.js"></script>
		- 	checkout.js
				<script src="https://checkout.stripe.com/checkout.js"></script>

	secondly link stripe.payment.tool.js to your script.
		<script src="stripe.payment.tool.js"></script>

	use stripe payment directive in your html page
		<button stripe-payment>New Card</button>

	inject 'stripe-payment-tools' module to your angular module.
		angular.module('stripe-app', ['stripe-payment-tools'])

	you can change configurations of payment tool. just bind config object to directive
		<button stripe-payment="config">New Card</button>

		declare config object in you controller
			$scope.config = {
				title: 'Duoworld',
				description: "for connected business",
				logo: 'img/small-logo.png',
				label: 'New Card',
			}

	catch token that genarated by stripe as below.
		$scope.$on('stripe-token-received', function(event, args) {
			console.log(args);
		});

**	feel free to change the directive.

*/
