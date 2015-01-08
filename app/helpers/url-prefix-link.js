import Ember from 'ember';
import config from 'oauthloginapp/config/environment';

export function urlPrefixLink(input, value) {
  var prefix = config.urlPrefix ? config.urlPrefix + '.' : '';
  return new Ember.Handlebars.SafeString('<a href="//' + prefix + input + '">' + value + '</a>');
}

export default Ember.Handlebars.makeBoundHelper(urlPrefixLink);
