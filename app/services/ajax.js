import AjaxService from 'ember-ajax/services/ajax';
import config from '@authmaker/login-app/config/environment';

export default AjaxService.extend({
  host: config.apiUrl
});
