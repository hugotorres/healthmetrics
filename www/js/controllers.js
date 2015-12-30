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
  $scope.newprofile={};
  $scope.newPressure={};
  $scope.addOne=false;
  var xs=[];
  var ys=[];
  var dates=[];
  var datosGrafica= [];
  $scope.perfiles= Perfiles.all();
  $scope.profile=$scope.perfiles[0];
  //$scope.items = $scope.profile.items?$scope.profile.items:[];//inincializacion de items como arregloen caso de que aun no exista
  $scope.items= Perfiles.getPressures();
  $scope.newPerfil=function(){
      $scope.profile= $scope.newprofile;
      Perfiles.add($scope.profile);
    //$scope.perfiles[0] = $scope.profile;
      Perfiles.save();
  };
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
  $scope.addPressure=function(){
    var fecha= new Date();
    var fechaFormateada = fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear();
    var newPres = {'high':$scope.newPressure.high,'low':$scope.newPressure.low,'date':fechaFormateada};
    Perfiles.addPressure(newPres);
    //$scope.profile.items= $scope.profile.items?$scope.profile.items:[];
    //$scope.profile.items.unshift(newPres);
    Perfiles.save();
   // Items.add({'high':$scope.newPressure.high,'low':$scope.newPressure.low,'date':fechaFormateada});
   //Items.save();
   // pressure.data[0].opacity = 0.2;
    Plotly.addTraces(pressure, {x: [fechaFormateada],y: [$scope.newPressure.low]});
    Plotly.addTraces(pressure, {x: [fechaFormateada],y: [$scope.newPressure.high]});

    Plotly.redraw(pressure);
    $scope.newPressure={};

    $scope.items = Perfiles.getPressures();
  };

})

.controller('ChatsCtrl', function($scope, Weights,Perfiles) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //

    $scope.addOne=false;
    $scope.newWeight={};
    $scope.weights = Perfiles.getWeights();
    $scope.perfiles= Perfiles.all();
    $scope.profile=$scope.perfiles[0];
/*=======*/

  var xs=[];
  var ys=[];
  var dates=[];
  var datosGrafica= [];
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
    var newWeight = {'kgs':$scope.newWeight.kgs,'date':fechaFormateada};
       Perfiles.addWeight(newWeight);
   // Weights.add({'kgs':$scope.newWeight.kgs,'date':fechaFormateada});
   // Weights.save();
    Plotly.addTraces(weightGraph, {x: [fechaFormateada],y: [$scope.newWeight.kgs]});
    Plotly.redraw(weightGraph);
    $scope.newWeight={};
    $scope.weights = Perfiles.getWeights();
    
  };
})

.controller('NotesCtrl', function($scope, Notes,Perfiles) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
    $scope.addOne=false;
    $scope.newNote={};
    $scope.notes = Perfiles.getNotes();
    $scope.remove = function(note) {
      Notes.remove(note);
    };
    $scope.addNote=function(){
        var fecha= new Date();
        var fechaFormateada = fecha.getDate()+'/'+fecha.getMonth()+'/'+fecha.getFullYear();
        var note ={'note':$scope.newNote.txt,'date':fechaFormateada,'id':fecha.getUTCMilliseconds(),'title':$scope.newNote.title};
        Perfiles.addNote(note);
        //Notes.add();
        //Notes.save();
        $scope.newNote={};
        $scope.notes = Perfiles.getNotes();
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
.controller('NoteDetailCtrl', function($scope, $stateParams,Perfiles) {
  $scope.note = Perfiles.getNote($stateParams.noteId);
})
.controller('ChatDetailCtrl', function($scope, $stateParams, Weights) {
  $scope.weight = Weights.get($stateParams.weightId);
})

.controller('AccountCtrl', function($scope,$state,$ionicHistory,Weights,Items,Notes,Perfiles) {
  $scope.dataErased=localStorage.getItem("items")?false:true;
  $scope.nuevoPerfil= false;
  var perfiles = Perfiles.all();
  var weights= Perfiles.getWeights();
  var items = Perfiles.getPressures();
  var notes = Perfiles.getNotes();
  $scope.perfiles = perfiles;
  $scope.nuevoPerfil ={};
  //$scope.profile=[{'weights':weights,'items':items,'notes':notes}];
  $scope.addProfile=function(){
    console.log($scope);
    Perfiles.add($scope.nuevoPerfil);
    //  localStorage.setItem("perfil", JSON.stringify($scope.profile));
  };
  $scope.borrarDatos= function(){
    alert('Are you sure? this cannot be undone!',Weights.clear());
    $state.go('tab.dash',null,{reload:true});
    $scope.items =[];
    $scope.weights =[];
  };
});
