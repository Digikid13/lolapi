var request = require('request');

function ajax(url, cb) {
  request(url, function (error, response, body) {
    if (error) {
      cb(error);
    } else if (response.statusCode !== 200) {
      cb('Request failed: ' + response.statusCode);
    } else {
      cb(null, body);
    }
  });
}

function lolapi(options) {
  api = {};

  api.key = options.key;
  api.loc = options.loc || 'na';
  api.url = 'https://na.api.pvp.net/api/lol/';
  api.region = options.region || 'na';

  api.champion = {
    get: function(id, cb, region) {
      region = region || api.region;

      var url = api.url + region + '/v1.2/champion/' + id + '?api_key=' + api.key;

      ajax(url, cb);
    },

    getAll: function(cb, region) {
      region = region || api.region;
      
      var url = api.url + region + '/v1.2/champion?api_key=' + api.key;

      ajax(url, cb);
    },

    getFree: function(cb, region) {
      region = region || api.region;
      
      var url = api.url + region + '/v1.2/champion?freeToPlay=true&api_key=' + api.key;

      ajax(url, cb);
    },
  };

  api.game = {
    recent: function(id, cb, region) {
      region = region || api.region;

      var url = api.url + region + '/v1.3/game/by-summoner/' + id + '/recent?api_key=' + api.key;

      ajax(url, cb);
    }
  };

  api.league = {
    getSummonerLeague: function(id, cb, region) {
      region = region || api.region;

      var url = api.url + region + '/v2.5/league/by-summoner/' + id.toString() + '?api_key=' + api.key;

      ajax(url, cb);
    },

    getSummoner: function(id, cb, region) {
      region = region || api.region;

      var url = api.url + region + '/v2.5/league/by-summoner/' + id.toString() + '/entry?api_key=' + api.key;
      
      ajax(url, cb);
    },

    getTeamLeague: function(id, cb, region) {
      region = region || api.region;

      var url = api.url + region + '/v2.5/league/by-team/' + id.toString() + '?api_key=' + api.key;

      ajax(url, cb);
    },

    getTeam: function(id, cb, region) {
      region = region || api.region;

      var url = api.url + region + '/v2.5/league/by-team/' + id.toString() + '/entry?api_key=' + api.key;

      ajax(url, cb);
    },

    getChallenger: function(type, cb, region) {
      region = region || api.region;

      if (type === 'solo') {
        type = 'RANKED_SOLO_5x5';
      } else if (type === 'team3') {
        type = 'RANKED_TEAM_3x3';
      } else if (type === 'team5') {
        type = 'RANKED_TEAM_5x5';
      }

      var url = api.url + region + '/v2.5/league/challenger?type=' + type + '&api_key=' + api.key;
      
      ajax(url, cb);
    },
  };
  
  api.static = {};

  api.static = function() {
    console.log('not implemented');
  };
  
  api.status = function(cb, region) {
    region = region || api.region;

    var url = 'http://status.leagueoflegends.com/shards/' + region;
      
    ajax(url, cb);
  };

  api.match = {
    info: function(id, cb, timeline, region) {
      region = region || api.region;
      timeline = timeline || false;

      var url = api.url + region + '/v2.2/match/' + id + '?includeTimeline=' + timeline + '&api_key=' + api.key;

      ajax(url, cb);
    }
  };
  
  api.stats = {};
  
  api.summoner = {};
  
  api.team = {};
  
  return api;
}

/*
var api = lolapi({
  key: 'test-key-here',
  loc: 'na'
});

api.match.info(1531452956, function(err, data) {
  console.log(err, data);
});
*/

module.exports = lolapi;