angular.module('starter.controllers', ['ionic.cloud'])

.controller('DashCtrl', function($scope, $ionicPopup, $state) {
	// Catch push messages when in app
	$scope.$on('cloud:push:notification', function(event, data) {
		console.log(data);
		var msg = data.message;
		//alert(msg.title + ': ' + msg.text);

		$scope.showConfirm = function(msg) {
			console.log(msg);
			var confirmPopup = $ionicPopup.confirm({
				title: 'New push message!',
				template: msg.text + '\n Do you want to open this item?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					var category = msg.payload.category;
					var itemId = msg.payload.itemId;

					if(category == 'cats') {
						$state.go('tab.cat-detail', {catId: itemId});
					}
				} else {
					return true;
				}
			});
		};

		$scope.showConfirm(msg)

	});
})

.controller('SettingsCtrl', function($scope, $cordovaToast, $ionicPush) {
	$scope.settings = {};

	$scope.togglePush = function() {
		if($scope.settings.pushMessages) {
			$ionicPush.register().then(function (t) {
				return $ionicPush.saveToken(t);
			}).then(function (t) {
				console.log('Token saved:', t);
				var toastMsg = 'Push messages enabled with token ' + t.token;
				$cordovaToast.show(toastMsg, 'long', 'bottom');
			});
		}
		else {
			$ionicPush.unregister().then(function () {
				var toastMsg = 'Push messages disabled';
				$cordovaToast.show(toastMsg, 'short', 'bottom')
			});
		}
	}
})


.controller('CatsCtrl', function($scope, Cats) {
 	$scope.cats = Cats.all();
})

.controller('CatDetailCtrl', function($scope, $stateParams, Cats) {
  	$scope.cat = Cats.get($stateParams.catId);
  	$scope.catId = $stateParams.catId;
})

.controller('DogsCtrl', function($scope, Dogs) {
 	$scope.dogs = Dogs.all();
})

.controller('DogDetailCtrl', function($scope, $stateParams, Dogs) {
  	$scope.dog = Dogs.get($stateParams.dogId);
  	$scope.dogId = $stateParams.dogId;
});





