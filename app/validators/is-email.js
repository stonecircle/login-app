import Base from 'ember-validations/validators/base';

export default Base.extend({
    call: function() {
        // http://www.regxlib.com/REDetails.aspx?regexp_id=26
        var regex = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;

        if (!regex.test(this.model.get(this.property))) {
            this.errors.pushObject("is not a valid email");
            return false;
        }

        return true;
    }
});
