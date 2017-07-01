import * as must from 'must';
import { View, Widget } from '@quenk/wml/lib/runtime';
import view from './view';

class Application {

    constructor() {

        this.view = new View(view, this);

    }

    run() {

        window.app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = this.view.findById('drawer');


    }

    static main() {

        return (new this()).run();

    }

}


describe('Application', function() {

    it('should render', function() {

        Application.main();

    });

});
