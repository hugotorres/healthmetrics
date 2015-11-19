angular.module('starter.services', [])
.factory('Items',function(){



/*
  var items=[{'high':'116','low':'27','date':'11/11/2015','done':false},
   {'high':'123','low':'27','date':'10/11/2015','done':false},
   {'high':'167','low':'27','date':'9/11/2015','done':false}];
*/
   // Retrieve

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
.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
