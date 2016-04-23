var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', { title: 'Express' });
});

router.get('/register', function(req, res, next) {
  res.render('register', { title: 'Express' });
});

router.get('/home', function(req, res, next) {
  res.render('home', { title: 'Express' });
});

router.get('/search', function(req, res, next) {
  res.render('search', { title: 'Express' });
});

router.get('/paginationDemo', function(req, res, next) {
  res.render('paginationDemo', { title: 'Express' });
});

router.get('/testGeolocation', function(req, res, next) {
  res.render('testGeolocation', { title: 'Express' });
});

router.get('/searchPart2', function(req, res, next) {
  res.render('searchPart2', { title: 'Express' });
});



// these are the routes for a sample collection - (we may change these later to fit our needs)

var mongoose = require('mongoose');
var SavedSearch = mongoose.model('SavedSearch');

router.get('/createSavedSearch', function(req, res, next) {

    var search = new SavedSearch();
    search.placename = "Disney World";
    search.state = "California";


    search.save(function(err, data) {
        if (err)
        {
            return next(err);
        }
        res.send("Your data has been saved!");


    });

});

router.get('/savedSearches', function(req, res, next) {

    SavedSearch.find(function(err, data) {
        if (err)
        {
            return next(err);
        }

        res.json(data);

    });

});


// route to remove all savedSearches - be careful with this route (especially on live server)
router.get('/deleteSavedSearches', function(req, res, next) {

    SavedSearch.remove({}, function(err) {
        if (err)
        {
            return next(err);
        }
    });
        res.send("You have successfully removed all your data");


});

// seeders for the data
var Location = mongoose.model('Location');
var seeder = require('mongoose-seeder');
var data = require('../data/data.json');
router.get('/seedData', function(req, res, next) {


   seeder.seed(data, {dropCollections: true}).then(function(dbData) {

        res.json(dbData);

    }).catch(function(err) {

        // handle error
        return next(err);

    });

});

router.get('/seededData', function(req, res, next) {

  Location.find(function(err, data) {
        if (err)
        {
            return next(err);
        }

        res.json(data);

    });


});

var Game = mongoose.model('Game');
var textSearch = require('mongoose-text-search');


router.get('/search2Test', function(req, res, next) {

    // test it out
    //var Game = mongoose.model('Game', gameSchema);

    Game.create({ title: 'Super Mario 64', tags: ['nintendo', 'mario', '3d'] }, function (err)
    {
        if (err) return handleError(err);
    });

    console.log("success");


    Game.search("Super", {title: 1}, {
    conditions: {title: {$exists: true}},
    sort: {title: 1},
    limit: 10
    }, function(err, data) {
        // array of finded results
        console.log(data.results);
        // count of all matching objects
        console.log(data.totalCount);
    });


});

router.get('/gameData', function(req, res, next) {

    Game.find(function(err, data) {
        if (err)
        {
            return next(err);
        }

        res.json(data);

    });

});

var Location = mongoose.model('Location');
router.get('/search2', function(req, res, next) {

    // test it out
    //var Game = mongoose.model('Game', gameSchema)



    console.log("starting sarch!");


    Location.search("Rock", {name: 1}, {
    conditions: {name: {$exists: true}},
    sort: {name: 1},
    limit: 10
    }, function(err, data) {
        // array of finded results
        console.log(data.results);
        // count of all matching objects
        console.log(data.totalCount);
    });


});

router.get('/deleteLocations', function(req, res, next) {

    Location.remove({}, function(err) {
        if (err)
        {
            return next(err);
        }
    });
        res.send("You have successfully removed all your data");


});




module.exports = router;
