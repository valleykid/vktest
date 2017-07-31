import $ from 'jquery';
// const { forEach, ajax } = require('jquery');

export default function() {
  return $.ajax(...arguments);
}
