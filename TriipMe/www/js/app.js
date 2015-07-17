'use strict';

var fb = new Firebase("https://triipme.firebaseio.com");
var TriipMeApp = angular.module('TriipMeApp', ['ionic','firebase','ngCordova']);

TriipMeApp.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
});

