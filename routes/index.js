var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// seeders for the data
var Location = mongoose.model('Location');
var Park = mongoose.model('Park');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});


router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login' });
});

router.get('/register', function(req, res, next) {
    res.render('register', { title: 'Register' });
});


router.get('/home', function(req, res, next) {
    res.render('home', { title: 'Express' });
});

router.get('/userHome', function(req, res, next) {
    res.render('userHome', { title: 'Home' });
});

router.get('/profile', function(req, res, next) {
    res.render('profile', { title: 'Profile' });
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

router.get('/result/:id', function(req, res, next) {


    var id = req.params.id;

    Location.find({_id: id}, function(err, result)
    {
        if (err)
        {
            return next(err);
        }

        return res.send("On the resultpage: " + id + result);
    });
});



// these are the routes for a sample collection - (we may change these later to fit our needs)


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

    // var options = {
    //     project: 'title',
    //     filter: ''
    //
    // };

    //Game.textSearch('game -mario', )


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


    Location.textSearch("Rock", {name: 1, fcodeName: 2, lat: 3, lng: 4}, {
    filter: {name: {$exists: true}},
    sort: {name: 1}
    }, function(err, data) {
        // array of finded results
        console.log(data.results);
        // count of all matching objects
        console.log(data.totalCount);
    });


});

router.get('/search2/:userInput', function(req, res, next) {

    // test it out
    //var Game = mongoose.model('Game', gameSchema)
    console.log(req.params.userInput);
    var userInput = req.params.userInput;

    console.log("place only!");


    Location.search(userInput, {name: 1, fcodeName: 2, lat: 3, lng: 4}, {
    conditions: {name: {$exists: true}},
    sort: {name: 1}
    }, function(err, data) {
        // array of finded results
        console.log(data.results);
        // count of all matching objects
        console.log(data.totalCount);

        res.json(data);
    });


});


router.get('/search2/:placename/:state', function(req, res, next) {

    // test it out
    //var Game = mongoose.model('Game', gameSchema)
    console.log(req.params.placename);
    var placename = req.params.placename;
    var state = req.params.state;

    var queryString = placename + " " + state;
    console.log("starting search!");


    Location.search(queryString, {fcodeName: 1, lat: 2, lng: 3, postal: 4, adminName1: 5, name: 6},
    { conditions: {name: {$exists: true}},
        fields: ["postal", "fcodeName", "adminName1", "name"],
        sort: {name: 1}
    }, function(err, data) {
        // array of finded results
        console.log(data.results);
        // count of all matching objects
        console.log(data.totalCount);

        res.json(data);
    });


});

router.get('/searchState/:state', function(req, res, next) {

    // test it out
    //var Game = mongoose.model('Game', gameSchema)
    //console.log(req.params.placename);
    //var placename = req.params.placename;
    var state = req.params.state;

    //var queryString = placename + " " + state;
    console.log("starting search!");


    Location.search(state, {fcodeName: 1, lat: 2, lng: 3, postal: 4, adminName1: 5, name: 6},
    { conditions: {name: {$exists: true}},
        fields: ["postal", "fcodeName", "adminName1"],
        sort: {name: 1}
    }, function(err, data) {
        // array of finded results
        console.log(data.results);
        // count of all matching objects
        console.log(data.totalCount);

        res.json(data);
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


var passport = require('passport');
var User = mongoose.model('User');
var jwt = require('express-jwt');
var auth = jwt({secret: 'SECRET', userProperty: 'payload'});


// logging in and logging out
// logging and logging out
router.post('/register', function(req, res, next) {

    if (!req.body.username || !req.body.password )
    {
        return res.status(400).json({message: 'Please fill out all fields'});
    }
    var user = new User();

    user.username = req.body.username;

    user.setPassword(req.body.password);

    user.save(function(err) {
        if (err)
        {
            return next(err);
        }
        return res.json({token: user.generateJWT()});
    });
});

router.post('/login', function(req, res, next) {
    console.log(req.body.username);
    console.log(req.body.password);
    if (!req.body.username || !req.body.password)
    {
        return res.status(400).json({message: 'Please fill out all fields'});
    }

    passport.authenticate('local', function(err, user, info) {

        if (err)
        {
            console.log(err);
            return next(err);
        }

        if (user)
        {
            console.log(user);
            return res.json({token: user.generateJWT()});
        }
        else
        {
            return res.status(400).json(info);
        }


    })(req, res, next);

});


// test route to look at users
router.get('/users', function(req, res, next) {

    User.find(function(err, users) {
        if (err)
        {
            return next(err);
        }

        res.json(users);

    });

});

router.get('/deleteUsers', function(req, res, next) {

    User.remove({}, function(err) {
        if (err)
        {
            return next(err);
        }
    });
    res.send("You have successfully removed all your data");

});

router.post('/savePark', function(req, res, next) {

    console.log(req.body);
    var park = new Park(req.body);
    console.log(park);
    park.save(function(err, park) {
        if (err)
        {
            return next(err);
        }
        res.json("You have successfully saved the park");

    });




});

router.get('/parks/:userId', function(req, res, next) {

    Park.find({user: req.params.userId}, function(err, parkInfo) {
        if (err)
        {
            return next(err);
        }

		console.log(parkInfo);
        res.json(parkInfo);

    });




});




module.exports = router;
