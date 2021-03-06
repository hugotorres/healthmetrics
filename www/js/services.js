angular.module('starter.services', [])
.factory('Items',function($http,$q){
/*
return ({
  all: getItems

});
function getItems(){
  var request= $http(
      {
        method: "get",
        url:"https://api.import.io/store/data/d76799a9-ab3e-4ae7-a321-9df7d59d4406/_query?input/webpage/url=https%3A%2F%2Fwww.lifemiles.com%2Fesp%2Fear%2Fpar%2Fparearmile.aspx&_user=1c356ddf-282b-4956-a8c3-f4810678af53&_apikey=1c356ddf282b4956a8c3f4810678af538b03c128d84c66a9bf35b89de854bba6598dea2605f4c0ffaa00360d087b6eb03888ad1aa2fb5bf7e9d1cec1652a4be73b1a13185472321c14558f513d9dde2f",
        params:{},data:{}
        }
    );
  return (request.then(handleSuccess,handleError));
};
function handleSuccess(response){
  console.log(response);
  return response.data;
}
function handleError(response){
  return response.error;
}
*/

  /*  return $resource('https://api.import.io/store/data/d76799a9-ab3e-4ae7-a321-9df7d59d4406/_query?input/webpage/url=https%3A%2F%2Fwww.lifemiles.com%2Fesp%2Fear%2Fpar%2Fparearmile.aspx&_user=1c356ddf-282b-4956-a8c3-f4810678af53&_apikey=1c356ddf282b4956a8c3f4810678af538b03c128d84c66a9bf35b89de854bba6598dea2605f4c0ffaa00360d087b6eb03888ad1aa2fb5bf7e9d1cec1652a4be73b1a13185472321c14558f513d9dde2f:id',{id:'@_id'},{
        update: {
            method: 'PUT'
        }
    });
*/
var perfiles = localStorage.getItem("perfiles")?JSON.parse(localStorage.getItem("perfiles")):[{'weights':null,'notes':null,'items':null}];
var items = perfiles[0].items;
   return{
    save:function(){
      localStorage.setItem("perfiles", JSON.stringify(perfiles));
    },
    all:function(){return items;},
    add:function(item){

      items.unshift(item);

    },
    remove: function(item) {
      item.splice(items.indexOf(item), 1);
    },
        get: function(itemId) {
      for (var i = 0; i < chats.length; i++) {
        if (items[i].id === parseInt(itemId)) {
          return items[i];
        }
      }
      return null;
    }
 };

 /* ,n,m n,mn */
})
.factory('Weights', function() {
  // Might use a resource here that returns a JSON array
var weights = localStorage.getItem("weights")?JSON.parse(localStorage.getItem("weights")):[];
  return {
    all: function() {
      return weights;
    },
    save:function(){
      localStorage.setItem("weights", JSON.stringify(weights));
    },
    clear:function(){
      localStorage.clear();
      console.log('borrando datos');
      weights=[];
    },
     add:function(weight){
      weights.unshift(weight);
    },
    remove: function(weights) {
      weights.splice(weights.indexOf(weights), 1);
    },
    get: function(weightId) {
      for (var i = 0; i < weights.length; i++) {
        if (weights[i].id === parseInt(weightId)) {
          return weights[i];
        }
      }
      return null;
    }
  };
})
.factory('Notes', function() {
  // Might use a resource here that returns a JSON array
var notes = localStorage.getItem("notes")?JSON.parse(localStorage.getItem("notes")):[];
  return {
    all: function() {
      return notes;
    },
    save:function(){
      localStorage.setItem("notes", JSON.stringify(notes));
    },
    clear:function(){
      localStorage.clear();
      console.log('borrando datos');
      notes=[];
    },
     add:function(note){
      notes.unshift(note);
    },
    remove: function(notes) {
      notes.splice(notes.indexOf(notes), 1);
    },
    get: function(noteId) {
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(noteId)) {
          return notes[i];
        }
      }
      return null;
    }
  };
})
.factory('Perfiles', function() {
  // Might use a resource here that returns a JSON array
  var pf= localStorage.getItem("perfiles");
  var emptyProfile= {'items':[],'weights':[],'notes':[]};
  var perfiles = pf?JSON.parse(pf):[emptyProfile];
  return {
    all: function() {
      return perfiles;
    },
    save:function(){
      localStorage.setItem("perfiles", JSON.stringify(perfiles));
    },
    clear:function(){
      localStorage.clear();
      console.log('borrando datos');
      weights=[];
    },
     add:function(perfil){
      perfiles.unshift(perfil);
      localStorage.setItem("perfiles", JSON.stringify(perfiles));
    },
    getPressures: function(){
        return perfiles[0].items?perfiles[0].items:[];
    },
    addPressure: function(pressure){
      perfiles[0].items= perfiles[0].items?perfiles[0].items:[];
      perfiles[0].items.unshift(pressure);
      localStorage.setItem("perfiles", JSON.stringify(perfiles));
    },
    addWeight: function(weight){
      perfiles[0].weights= perfiles[0].weights?perfiles[0].weights:[];
      perfiles[0].weights.unshift(weight);
      localStorage.setItem("perfiles", JSON.stringify(perfiles));
    },
    getWeights: function(){
      return perfiles[0].weights?perfiles[0].weights:[];
    },
    getNotes: function(){
      return perfiles[0].notes?perfiles[0].notes:[];
    },
    addNote:function(note){
      perfiles[0].notes= perfiles[0].notes?perfiles[0].notes:[];
      perfiles[0].notes.unshift(note);
      localStorage.setItem("perfiles", JSON.stringify(perfiles));
    },
    getNote:function(noteId){
      var notes =perfiles[0].notes;
      for (var i = 0; i < notes.length; i++) {
        if (notes[i].id === parseInt(noteId)) {
          return notes[i];
        }
      }
      return null;
    },
    getNoteId:function(){
      return perfiles[0].notes?perfiles[0].notes:[];
    }
    ,
    remove: function(perfiles) {
      perfiles.splice(perfiles.indexOf(perfiles), 1);
    },
    get: function(weightId) {
      for (var i = 0; i < weights.length; i++) {
        if (weights[i].id === parseInt(weightId)) {
          return weights[i];
        }
      }
      return null;
    }
  };
});
