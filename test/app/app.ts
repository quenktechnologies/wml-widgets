import * as must from 'must/register';
import { Main } from './view';
import { DrawerLayout } from '@quenk/wml-widgets/lib/components/drawer-layout/DrawerLayout';

class Application {

    drawer: DrawerLayout;
    view: Main;

    constructor() {

        this.view = new Main(this);

    }

    run() {

        (<any>window).app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = <DrawerLayout>this.view.findById('drawer');


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
