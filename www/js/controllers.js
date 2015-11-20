angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,Items) {
   $scope.items=Items.all();
  $scope.remove = function(item) {
    Items.remove(item);
  };
  $scope.newPressure={};
  $scope.nuevo=false;

  $scope.addPressure=function(){
    var fecha= new Date();
    Items.add({'high':$scope.newPressure.high,'low':$scope.newPressure.low,'date':fecha.toDateString()});
    $scope.newPressure={}
    Items.save();
  };



})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
   // console.log(e);
  });
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.dataErased=localStorage.getItem("items")?false:true;
  $scope.settings = {
    enableFriends: true
  };

  $scope.borrarDatos= function(){
    alert('Are you sure? this cannot be undone!',localStorage.setItem("items", []));
    $scope.dataErased=true;
  }
});
