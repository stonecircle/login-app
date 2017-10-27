import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  ajax: service(),
  model(){
    return get(this, 'ajax').request('/api/settings');
  }
});
