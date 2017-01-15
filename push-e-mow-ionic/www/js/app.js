// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services', 'ngCordova', 'ionic.cloud'])

.run(function($ionicPlatform, $state) {
  	$ionicPlatform.ready(function() {
	    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
	    // for form inputs)
	    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
	      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
	      cordova.plugins.Keyboard.disableScroll(true);

	    }
	    if (window.StatusBar) {
	      // org.apache.cordova.statusbar required
	      StatusBar.styleDefault();
	    }
  	});
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider, $ionicCloudProvider) {
	$ionicCloudProvider.init({
		"core": {
			"app_id": "YOUR APP ID"
		},
		"push": {
			"sender_id": "FCM SENDER ID",
			"pluginConfig": {
				"ios": {
					"badge": true,
					"sound": true
				},
				"android": {
					"iconColor": "#343434"
				}
			}
		}
	});



	$ionicConfigProvider.tabs.position('bottom'); // other values: top
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    	url: '/tab',
    	abstract: true,
    	templateUrl: 'templates/tabs.html'
  	})

  	// Each tab has its own nav history stack:

  	.state('tab.dash', {
    	url: '/dash',
    	views: {
      		'tab-dash': {
        		templateUrl: 'templates/tab-dash.html',
        		controller: 'DashCtrl'
      		}
    	}
  	})

    .state('tab.cats', {
      	url: '/cats',
      	views: {
        	'tab-cats': {
          		templateUrl: 'templates/tab-cats.html',
          		controller: 'CatsCtrl'
        	}
      	}
    })
    .state('tab.cat-detail', {
      	url: '/cats/:catId',
      		views: {
        		'tab-cats': {
          		templateUrl: 'templates/cat-detail.html',
          		controller: 'CatDetailCtrl'
        	}
      	}
    })

    .state('tab.dogs', {
      	url: '/dogs',
      	views: {
        	'tab-dogs': {
          		templateUrl: 'templates/tab-dogs.html',
          		controller: 'DogsCtrl'
        	}
      	}
    })
    .state('tab.dog-detail', {
      	url: '/dogs/:dogId',
      		views: {
        		'tab-dogs': {
          		templateUrl: 'templates/dog-detail.html',
          		controller: 'DogDetailCtrl'
        	}
      	}
    })


  	.state('tab.settings', {
    	url: '/settings',
    	views: {
      		'tab-settings': {
        		templateUrl: 'templates/tab-settings.html',
        		controller: 'SettingsCtrl'
      		}
    	}
  	});

  	// if none of the above states are matched, use this as the fallback
  	$urlRouterProvider.otherwise('/tab/dash');



});
