angular.module('starter.services', [])


.factory('Cats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var cats = [{
    id: 0,
    name: 'Christmas Cat',
    lastText: 'Merry Christmas!',
    face: 'img/cats/cat0.png'
  }, {
    id: 1,
    name: 'Hacker cat',
    lastText: '1337 h4x0r skills!',
    face: 'img/cats/cat1.png'
  }, {
    id: 2,
    name: 'Birthday Cat',
    lastText: 'Happy birthday to you!',
    face: 'img/cats/cat2.png'
  }, {
    id: 3,
    name: 'Mobile Kitten',
    lastText: 'Having fun with an app',
    face: 'img/cats/cat3.png'
  }];

  return {
    all: function() {
      return cats;
    },
    remove: function(cat) {
      cats.splice(cats.indexOf(cat), 1);
    },
    get: function(catId) {
      for (var i = 0; i < cats.length; i++) {
        if (cats[i].id === parseInt(catId)) {
          return cats[i];
        }
      }
      return null;
    }
  };
})

.factory('Dogs', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var dogs = [{
    id: 0,
    name: 'Hair dryer dog',
    lastText: 'Loving the breeze',
    face: 'img/dogs/dog0.png'
  }, {
    id: 1,
    name: 'Smile!',
    lastText: 'A smiling pug',
    face: 'img/dogs/dog1.png'
  }, {
    id: 2,
    name: 'Pet me!',
    lastText: 'This dog loves getting pet',
    face: 'img/dogs/dog2.png'
  }];

  return {
    all: function() {
      return dogs;
    },
    remove: function(dog) {
      dogs.splice(dogs.indexOf(dog), 1);
    },
    get: function(dogId) {
      for (var i = 0; i < dogs.length; i++) {
        if (dogs[i].id === parseInt(dogId)) {
          return dogs[i];
        }
      }
      return null;
    }
  };
});
