angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,Items) {
/*
  loadRemoteData();
  function loadRemoteData(){

    Items.all().then(function(items){applyRemoteData(items)});
  };
  function applyRemoteData(newitems){$scope.items = newitems.results};

*/




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

  var xs=[];
  var ys=[];
  var dates=[];
  var datosGrafica= [];
$scope.items.forEach(function(item){
xs.unshift(item.high);
ys.unshift(item.low);
dates.unshift(item.date);

});



var trace1 = {
    x:dates,
    y: xs,
    type: 'scatter',
    orientation: 'v'
};

var trace2 = {
    x:dates,
    y: ys,
    type: 'scatter',
    orientation: 'v'
};

var datosGrafica1=[{x:dates,y:ys,type:'bar',orientation: 'h'}];
var datosGrafica2=[{x:dates,y:ys,type:'scatter',orientation: 'v'}];

var datos=[trace1,trace2]

var layout1 = {
    showlegend: false
};

/*
Plotly.newPlot('pressure', datos,layout1, {staticPlot: true});
*/

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



/*=======*/

  var xs=[];
  var ys=[];
  var dates=[];
  var datosGrafica= [];
  console.log($scope.weights);
$scope.weights.forEach(function(weight){
xs.unshift(weight.kgs);
dates.unshift(weight.date);

});


var trace1 = {
    x:dates,
    y: xs,
    type: 'scatter',
    orientation: 'v'
};

var datos=[trace1]

var layout1 = {
    showlegend: false
};


/*
Plotly.newPlot('weightGraph', datos,layout1, {staticPlot: true});
*/
/*=====*/




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
  var weights= Weights.all();
  var items = Items.all();

  $scope.profile={weights,items};
  $scope.addProfile=function(){
      localStorage.setItem("perfil", JSON.stringify($scope.profile));
  }
  $scope.borrarDatos= function(){
    alert('Are you sure? this cannot be undone!',Weights.clear());
    $state.go('tab.dash',null,{reload:true});
    $scope.items =[];
    $scope.weights =[];
  }
});
