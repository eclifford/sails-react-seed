/**
 * Park
 *
 * @module      :: Model
 * @description :: A short summary of how this model works and what it represents.
 * @docs		:: http://sailsjs.org/#!documentation/models
 */

module.exports = {

  schema: true,
  migrate: 'safe',

  attributes: {
    title: {
      type: 'STRING',
      required: true
    },
    geo: {
      type: 'json'
    },
    slug: {
      type: 'STRING'
    },
    state: {
      type: 'STRING',
      required: true
    },
    cityNearest: {
      type: 'STRING',
      required: false
    },
    lat: {
      type: 'FLOAT'
    },
    lng: {
      type: 'FLOAT'
    },
    siteGovUrl: {
      type: 'STRING',
      required: false
    },
    foursquareUrl: {
      type: 'STRING',
      required: false
    },
    yelpUrl: {
      type: 'STRING',
      required: false
    },
    facebookUrl: {
      type: 'STRING',
      required: false
    },
    tripadvisorUrl: {
      type: 'STRING',
      required: false
    },
    foursquareId: {
      type: 'STRING',
      required: false
    }
  }

};
