import * as must from 'must/register';
import { Main } from './view';
import { DrawerLayout } from '@quenk/wml-widgets/lib/components/drawer-layout/DrawerLayout';
import { ActionArea } from '@quenk/wml-widgets/lib/components/action-area/ActionArea';
import { MainView } from '@quenk/wml-widgets/lib/components/main-view/MainView';

interface Record {

    name: string;
    amount: number;

};

class Application {

    drawer: DrawerLayout;
    view: Main;
    records: Record[] = [{ name: 'Jozain Huldum', amount: 32000 }];

    constructor() {

        this.view = new Main(this);

    }

    toggleDrawer() {

        (<DrawerLayout>this.view.findById('layout')).toggleDrawer();

    }

    create() {

        this.records.push({
            name: prompt('Enter the name'),
            amount: parseFloat(prompt('Enter the amount.'))
        });

        this.view.invalidate();

    }

    run() {

        (<any>window).app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = <DrawerLayout>this.view.findById('layout');


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
