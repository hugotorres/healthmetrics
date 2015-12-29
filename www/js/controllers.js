angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope,Items,Perfiles,$state) {
/*
  loadRemoteData();
  function loadRemoteData(){
    Items.all().then(function(items){applyRemoteData(items)});
  };
  function applyRemoteData(newitems){$scope.items = newitems.results};
*/
/*var perfs = Perfiles.all();
if(!perfs.length){
  console.log('nohay perilesaun');
  $state.go('initial');
}
*/
  var xs=[];
  var ys=[];
  var dates=[];
  var datosGrafica= [];
  $scope.perfiles= Perfiles.all();
  $scope.profile=$scope.perfiles[0];
  $scope.newProfile= $scope.perfiles.lenght?$scope.perfiles[0]:{};

$scope.newPerfil=function(){
  Perfiles.add($scope.newProfile);
  Perfiles.save();
  $scope.perfiles= Perfiles.all();
  $scope.profile=$scope.perfiles[0];
};

$scope.items=Items.all();
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
var datos=[trace1,trace2];
var layout1 = {
    showlegend: false,
    autosize: true,
    width: 450,
    height: 200,
    margin: {
      l: 30,
      r: 30,
      b: 20,
      t: 20,
      pad: 2
    }
};

  Plotly.newPlot('pressure', datos,layout1, {staticPlot: true});

  $scope.remove = function(item) {
    Items.remove(item);
  };

  $scope.newPressure={};
  $scope.addOne=false;

  $scope.addPressure=function(){
    var fecha= new Date();
    var fechaFormateada = fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear();
    Items.add({'high':$scope.newPressure.high,'low':$scope.newPressure.low,'date':fechaFormateada});
    Items.save();
   // pressure.data[0].opacity = 0.2;
    Plotly.addTraces(pressure, {x: [fechaFormateada],y: [$scope.newPressure.low]});
    Plotly.addTraces(pressure, {x: [fechaFormateada],y: [$scope.newPressure.high]});

    Plotly.redraw(pressure);
    $scope.newPressure={};
  };

})

.controller('ChatsCtrl', function($scope, Weights) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //

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
var datos=[trace1];
var layout1 = {
    showlegend: false,
    autosize: true,
    width: 450,
    height: 200,
    margin: {
      l: 30,
      r: 30,
      b: 20,
      t: 20,
      pad: 2
    }
};

Plotly.newPlot('weightGraph', datos,layout1, {staticPlot: true});
/*=====*/
  $scope.remove = function(weight) {
    Weights.remove(weight);
  };
    $scope.addWeight=function(){
    var fecha= new Date();
    var fechaFormateada = fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear();
    Weights.add({'kgs':$scope.newWeight.kgs,'date':fechaFormateada});
    Weights.save();
    Plotly.addTraces(weightGraph, {x: [fechaFormateada],y: [$scope.newWeight.kgs]});
    Plotly.redraw(weightGraph);
    $scope.newWeight={};
  };
})

.controller('NotesCtrl', function($scope, Notes) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
    $scope.addOne=false;
    $scope.newNote={};
    $scope.notes = Notes.all();
    $scope.remove = function(note) {
    Notes.remove(note);
  };
    $scope.addNote=function(){
        var fecha= new Date();
        var fechaFormateada = fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear();
        Notes.add({'note':$scope.newNote.txt,'date':fechaFormateada,'id':fecha.getUTCMilliseconds(),'title':$scope.newNote.title});
        Notes.save();
        $scope.newNote={};
  };
})
.controller('InitialCtrl', function($scope,Perfiles,$state) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  console.log(Perfiles.all());
  console.log($state.current);

})


.controller('NoteDetailCtrl', function($scope, $stateParams, Notes) {
  $scope.note = Notes.get($stateParams.noteId);
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Weights) {
  $scope.weight = Weights.get($stateParams.weightId);
})

.controller('AccountCtrl', function($scope,$state,$ionicHistory,Weights,Items,Perfiles) {
  $scope.dataErased=localStorage.getItem("items")?false:true;
  $scope.nuevoPerfil= false;
  $scope.settings = {
    enableFriends: true
  };



  var weights= Weights.all();
  var items = Items.all();
  var perfiles = Perfiles.all();

  $scope.profile=[weights,items];
  $scope.addProfile=function(){
      localStorage.setItem("perfil", JSON.stringify($scope.profile));

  };
  $scope.borrarDatos= function(){
    alert('Are you sure? this cannot be undone!',Weights.clear());
    $state.go('tab.dash',null,{reload:true});
    $scope.items =[];
    $scope.weights =[];
  };
});
