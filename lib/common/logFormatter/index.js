/* ================================================================
 * macaca by xdf(xudafeng[at]126.com)
 *
 * first created at : Tue Nov 20 2015 17:16:10 GMT+0800 (CST)
 *
 * ================================================================
 * Copyright zichen.zzc
 *
 * Licensed under the MIT License
 * You may not use this file except in compliance with the License.
 *
 * ================================================================ */

'use strict';

var screenshot = require('./screenshot');
var performance = require('./performance');

function handler(type, log, contentType) {
  if (typeof type !== 'string') {
    throw new TypeError('type must be string.');
  }
  if (typeof log !== 'string') {
    throw new TypeError('log must be string.');
  }
  type = type.trim().toLowerCase();
  log = log.trim();
  switch (type) {
    case 'screenshot':
      if (contentType === 'html') {
        return screenshot(log);
      } else if (contentType === 'tty') {
        return log;
      }
      break;
    case 'performance':
      return performance(log, contentType);
      break;
    default:
      return '';
  }
}

function format(logs, contentType) {
  var pattern = /\<\#([\s\S]*?)\#\>/g;
  return logs.replace(pattern, function(matchStr, identifyStr) {
    var arr = identifyStr.split('|');
    var type = arr[0];
    var log = arr[1];
    if (type && log) {
      var res = handler(type, log, contentType);
      if (res) {
        return res;
      }
    }
    return matchStr;
  });
}

module.exports = format;
