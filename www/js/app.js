// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic','starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
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
    if(window.plugins && window.plugins.AdMob) {
            var admob_key = device.platform == "Android" ? 
            "ca-app-pub-1204146656205942/7542976719" : "ca-app-pub-1204146656205942/7542976719";
            var admob = window.plugins.AdMob;
            admob.createBannerView( 
                {
                    'publisherId': admob_key,
                    'adSize': admob.AD_SIZE.BANNER,
                    'bannerAtTop': false
                }, 
                function() {
                    admob.requestAd(
                        { 'isTesting': false }, 
                        function() {
                            admob.showAd(true);
                        }, 
                        function() { console.log('failed to request ad'); }
                    );
                }, 
                function() { console.log('failed to create banner view'); }
            );
    }
  });
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
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
    .state('initial', {
    url: '/initial',
    views: {
      'initial': {
        templateUrl: 'templates/initial.html',
        controller: 'InitialCtrl'
      }
    }
  })
  .state('tab.notes', {
      url: '/notes',
      views: {
        'tab-notes': {
          templateUrl: 'templates/tab-notes.html',
          controller: 'NotesCtrl'
        }
      }
    })
  .state('tab.chats', {
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/tab-chats.html',
          controller: 'ChatsCtrl'
        }
      }
    })
    .state('tab.note-detail', {
      url: '/notes/:noteId',
      views: {
        'tab-notes': {
          templateUrl: 'templates/note-detail.html',
          controller: 'NoteDetailCtrl'
        }
      }
    })
    .state('tab.chat-detail', {
      url: '/chats/:weightId',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat-detail.html',
          controller: 'ChatDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/dash');

});
