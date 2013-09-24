PRODUCTION = {
  'Security Compass': {
    url: 'http://securitycompass.com',
    test: function(res) {
      if(res.body.match(/All Rights Reserved/ig)) return true;
      return false;
    }
  },
  'SD Elements': {
    url: 'http://sdelements.com',
    test: function(res) {
      if(res.body.match(/All Rights Reserved/ig)) return true;
      return false;
    }
  }
};

INTERNAL = {
  'github': {
    url: 'https://github.com'
  }
};

module.exports = {
  INTERNAL: INTERNAL,
  PRODUCTION: PRODUCTION
};