import Base from 'ember-validations/validators/base';

export default Base.extend({
    call() {
        // http://www.regxlib.com/REDetails.aspx?regexp_id=26
        var regex = /^([\+\w-]+(?:\.[\+\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;

        if (!regex.test(this.model.get(this.property))) {
            this.errors.pushObject("is not a valid email");
            return false;
        }

        return true;
    }
});
