/**
 * ParkController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var config = {
 'secrets': {
   'clientId': 'SBAEMS3Z3DEW4LMNAA022S4HEQQH0RMPPUD3C4WSGX3PB5XF',
   'clientSecret': 'GYENX45GDSRBSNOSVPSTW2ORZRKQDIYVIGHQ21ZLVGPH3L55',
   'redirectUrl': 'http://localhost:1337/foursquare/callback'
 }
};

var Foursquare = require('node-foursquare')(config);
var _s = require('underscore.string');

module.exports = {

  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ParkController)
   */
  _config: {
    prefix: '/api/v1'
  },

  update: function(req, res) {
    Park.find({ state: 'UT'})
      .exec(function(err, parks){
        parks.forEach(function(park) {
          if (park.foursquareId) {
            Foursquare.Venues.getVenue(park.foursquareId, null, function(err, data) {
              Park.update({id: park.id}, {
                geo: {
                  type: "Feature",
                  geometry: {
                    type: "Point",
                    coordinates: [data.venue.location.lng, data.venue.location.lat]
                  },
                  properties: {
                    name: park.title,
                    slug: park.slug
                  }
                }
              }).exec(function(err, parks) {
                res.json(parks);
              });

              // Park.update({id: park.id}, {
              //   lat: data.venue.location.lat,
              //   lng: data.venue.location.lng
              // }).exec(function(err, parks) {
              //   res.json(parks);
              // });
            });
          }
        });
        res.json(parks);
      });
  },

  geo: function(req, res) {
    Park.find(function(err, parks) {
      var geoJSON = [];
      parks.forEach(function(park) {
        if (park.geo) {
          geoJSON.push(park.geo);
        }
      });
      res.json({
        type: 'FeatureCollection',
        features: geoJSON
      });
    });
  },

  findOne: function(req, res) {
    var slug = req.param('slug');
    if(slug) {
      Park.findOne({slug: slug}, function(err, park) {
        if(err) throw err;
        if(park.foursquareId) {
          Foursquare.Venues.getPhotos(park.foursquareId, null, null, null, function (error, data) {
            if(error) throw error;
            park.photos = data.photos;
            res.json(park);
          });
        }
      });
    } else {
      res.json({'error': 'brah you need a slug'});
    }
  },

  // find: function(req, res) {
  //   var query = Park.find();
  //
  //   query.where(req.params.all());
  //
  //   query.exec(function(err, parks) {
  //     if (err) return res.json({ err: err}, 500);
  //     res.json(parks);
  //   });
  // }
};
