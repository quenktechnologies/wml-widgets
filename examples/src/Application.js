import { View, Widget } from 'wmljs/lib/runtime';
import layout from './wml/layout.wml';
import NewUserForm from './NewUserForm';


class Application {

    constructor() {

        this.view = new View(layout, this);
        this.drawer = null;
        this.actions = null;
        this.notifications = null;
        this.content = null;
        this.modal = null;

    }

    showNewUserDialog() {

        this.modal.put(new NewUserForm(this));

    }

    menuButtonClicked() {

        this.drawer.toggle();

    }

    navigate(item) {

        item.active();

    }

    /**
     * searchUsers
     */
    searchUsers(value, autocomplete) {

        console.log('searching with ', value);
        autocomplete.update(['Paul', 'Litchie']);

    }

    userSelected(value, name) {

        console.log(`Selected: ${name}->${value}`);

    }

    run() {

        window.app = this;
        document.body.insertBefore(this.view.render(), document.body.firstChild);

        this.drawer = this.view.findById('drawer');
        this.actions = this.view.findById('actions');
        this.notifications = this.view.findById('notifications');
        this.content = this.view.findById('main');
        this.modal = this.view.findById('modal');

        this.notifications.put('Application started!');

    }

    static main() {

        return (new this()).run();

    }

}

Application.main();
