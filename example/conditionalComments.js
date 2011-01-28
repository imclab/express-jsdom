/**
 * Aspect that inserts conditional comments for IE:
 * http://paulirish.com/2008/conditional-stylesheets-vs-css-hacks-answer-neither/ 
 */

/**
 * Borrow jsdom's serialization code
 */
var stringify = require('jsdom/browser/domtohtml').stringifyElement;

/**
 * Use jQuery for DOM manipulation
 */
exports.depends = 'jquery';

/**
 * Wrap the body start tag ...
 */
exports.beforeRender = function($) {
  var b = $('body');
  b.addClass('not-ie');
  var bodyTag = stringify(b[0]).start;

  for (var v = 6; v <= 9; v++) {
    var exp = v < 7 ? 'lt IE 7' : 'IE ' + v;
    var cc = '<!--[if ' + exp + ']>' + bodyTag.replace('not-ie', 'ie' + v) + '<![endif]-->';
    b.before(cc);
  }
  b.before('<!--[if (gt IE 9)|!(IE)]><!-->').prepend('<!--<![endif]-->');
  $('<!--[if IE]><![endif]-->').prependTo('head');
};