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



module.exports = router;


