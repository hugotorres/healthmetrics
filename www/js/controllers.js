angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,Items) {
   $scope.items=Items.all();
  $scope.remove = function(item) {
    Items.remove(item);
  };
  $scope.newPressure={};
  $scope.addOne=false;

  $scope.addPressure=function(){
    var fecha= new Date();
    Items.add({'high':$scope.newPressure.high,'low':$scope.newPressure.low,'date':fecha.toDateString()});
    $scope.newPressure={};
    Items.save();
  };



})

.controller('ChatsCtrl', function($scope, Weights) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  $scope.$on('$ionicView.enter', function(e) {
   // console.log(e);
  });
    $scope.addOne=false;
     $scope.newWeight={};
  $scope.weights = Weights.all();
  $scope.remove = function(weight) {
    Weights.remove(weight);
  };
    $scope.addWeight=function(){
    var fecha= new Date();
    Weights.add({'kgs':$scope.newWeight.kgs,'date':fecha.toDateString()});
    $scope.newWeight={};
    Weights.save();
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Weights) {
  $scope.weight = Weights.get($stateParams.weightId);
})



.controller('AccountCtrl', function($scope,$state,$ionicHistory,Weights,Items) {
  $scope.dataErased=localStorage.getItem("items")?false:true;
  $scope.settings = {
    enableFriends: true
  };

  $scope.profile={Weights,Items};
  $scope.guardarPerfil=function(){
      localStorage.setItem("perfil", JSON.stringify(items));
  }
  $scope.borrarDatos= function(){
    alert('Are you sure? this cannot be undone!',Weights.clear());
    $state.go('tab.dash',null,{reload:true});
    $scope.items =[];
    $scope.weights =[];
  }
});
