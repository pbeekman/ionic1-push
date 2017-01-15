angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope, $ionicPopup, $state) {
	// Catch push messages when in app
	document.addEventListener('urbanairship.push', function(event){
		console.log(event);

		$scope.showConfirm = function() {
			var confirmPopup = $ionicPopup.confirm({
				title: 'Push message!',
				template: event.message + '\\n Do you want to open this item?'
			});

			confirmPopup.then(function(res) {
				if(res) {
					var category = event.extras.category;
	    			var itemId = event.extras.itemId;

		        	if(category == 'cats') {
		        		$state.go('tab.cat-detail', {catId: itemId});
		        	}
		        	else if(category == 'dogs') {
		        		$state.go('tab.dog-detail', {dogId: itemId});
		        	}
				} else {
					return true;
				}
			});
		};

		$scope.showConfirm();
	});	
})

.controller('SettingsCtrl', function($scope, $cordovaToast) {
	$scope.settings = {
		pushMessages: false
	};

	UAirship.isUserNotificationsEnabled(function(status) {
		if(status == 1) {
			$scope.settings.pushMessages = true;
		}
	});


	// Get current user tags
	UAirship.getTags(function (tags) {
		$scope.currTags = tags;
		$scope.settings.catMessages = tags.indexOf('cats') > -1 ? true : false;
		$scope.settings.dogMessages = tags.indexOf('dogs') > -1 ? true : false;
	});

	// Register for push
	$scope.togglePush = function(){
		UAirship.setUserNotificationsEnabled($scope.settings.pushMessages, function(){
			if($scope.settings.pushMessages) {
				var toastMsg = 'Push messages enabled';
			}
			else {
				var toastMsg = 'Push messages disabled';
			}

			$cordovaToast.show(toastMsg, 'long', 'bottom')
				.then(function(success) {
					// success
				}, function (error) {
					// error
				});
		});
	}

	$scope.addPushCategory = function(cat) {
		var currentTags = UAirship.getTags(function (tags) {
			var tagPosition = tags.indexOf(cat);
			$scope.currTags = tags;

			// Enable push category
			if(tagPosition == -1) {
				tags.push(cat);
				var catToastMsg = 'Push for category ' + cat + ' enabled';
			}

			// Disable push category
			else {
				if(tagPosition > -1) {
					tags.splice(tagPosition, 1);
					var catToastMsg = 'Push for category ' + cat + ' disabled';
				}
			}

			UAirship.setTags(tags, function () {
				$cordovaToast.show(catToastMsg, 'short', 'bottom')
					.then(function(success) {},
						function (error) {});
			});
		});
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