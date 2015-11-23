angular.module('starter.services', [])
.factory('Items',function(){
var items = localStorage.getItem("items")?JSON.parse(localStorage.getItem("items")):[];
   return{
    save:function(){
      localStorage.setItem("items", JSON.stringify(items));
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
    }
    ,
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
});
