import { View } from 'wmljs/lib/runtime';
import new_user_form from './wml/new_user_form.wml';

/**
 * NewUserForm
 */
class NewUserForm {

    constructor(app) {

        this.app = app;
        this.view = new View(new_user_form, this);

    }

    save() {

    }

    cancel() {

        this.app.modal.modal.hide();

    }

    render() {

        return this.view.render();

    }

}

export default NewUserForm
