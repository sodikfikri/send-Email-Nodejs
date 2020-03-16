'use strict';

exports.ok = function(values, res) {
  var data = {
      'code': 200,
      'status': 'success',
      'data': values
  };
  res.json(data);
  res.end();
};