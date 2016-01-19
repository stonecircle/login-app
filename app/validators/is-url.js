import Base from 'ember-validations/validators/base';

export default Base.extend({
    call() {
        var val = this.model.get(this.property) ? this.model.get(this.property).trim() : null;

        var regex = /^http[s]?:\/\/.*$/;

        if (!regex.test(val)) {
            this.errors.pushObject("is not a valid URL");
        }
    }
});
