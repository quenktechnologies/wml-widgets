import * as must from 'must/register';
import * as Styles from 'wml-widgets-common/Styles';
import { Main, CreateDialog } from './view';
import { DrawerLayout } from '@quenk/wml-widgets/lib/components/drawer-layout/DrawerLayout';
import { Modal } from '@quenk/wml-widgets/lib/components/modal/Modal';
import { ActionArea } from '@quenk/wml-widgets/lib/components/action-area/ActionArea';
import { MainView } from '@quenk/wml-widgets/lib/components/main-view/MainView';

var count = 0;
interface Record {

    name: string;
    amount: number;

};

class Application {

    drawer: DrawerLayout;
    modal: Modal;
    view: Main;
    records: Record[] = [{ name: 'Jozain Huldum', amount: 32000 }];

    constructor() {

        this.view = new Main(this);

    }

    toggleDrawer() {

        (<DrawerLayout>this.view.findById('layout')).toggleDrawer();

    }

    create() {

        let target = document.getElementById('modal');

        while (target.firstChild)
            target.removeChild(target.firstChild);

        target.appendChild((new CreateDialog(this)).render());

        console.log('taer ', target);

    }

    run() {

        (<any>window).app = this;
        document.getElementById('main').appendChild(this.view.render());
        this.drawer = <DrawerLayout>this.view.findById('layout');


    }

    static main() {

        return new this();

    }

}

let app: Application;

describe('Application', function() {

    before('should render', function() {

        app = Application.main();
        app.run();

    });

    describe('DrawerLayout', function() {

        describe('DrawerLayout#toggleDrawer()', function() {

            it('should hide and show the drawer', function(done) {

                let layout = (<DrawerLayout>app.view.findById('layout'));
                let drawer = <HTMLElement>document.getElementsByClassName(Styles.DRAWER)[0];

                must(drawer.clientWidth).not.be(0);
                layout.toggleDrawer();

                setTimeout(() => {

                    must(drawer.clientWidth).be(0);
                    layout.toggleDrawer();

                    setTimeout(() => {

                        must(drawer.clientWidth).not.be(0);
                        done();

                    }, 1000)
                }, 1000)

            });

        });

    });

});
