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
