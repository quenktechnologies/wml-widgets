import * as must from 'must/register';
import * as Styles from 'wml-widgets-common/Styles';
import { Main, CreateDialog } from './view';
import { DrawerLayout } from '@quenk/wml-widgets/lib/components/drawer-layout/DrawerLayout';
import { Modal } from '@quenk/wml-widgets/lib/components/modal/Modal';
import { ActionArea } from '@quenk/wml-widgets/lib/components/action-area/ActionArea';
import { MainView } from '@quenk/wml-widgets/lib/components/main-view/MainView';
import { Field, SortTableModel } from '@quenk/wml-widgets/lib/components/table/Table';

var count = 0;

interface Record {

    name: string;
    amount: number;
    status: string;
    watchers: number[];

};

class Next {

    constructor(
        public name: string = '',
        public amount: number = 0,
        public status: string = '',
        public watchers = []) { }

}

const fields = [
    { name: 'number', heading: 'Number' },
    { name: 'name', heading: 'Name' },
    { name: 'amount', heading: 'Amount' },
    { name: 'status', heading: 'Status' },
    { name: 'watching', heading: 'Watching' }
];

class Application<A> {

    drawer: DrawerLayout;
    dialog: CreateDialog<Application<A>>;
    view: Main<Application<A>>;
    fields: Field[] = fields;
    tableModel = new SortTableModel();
    next: any = new Next();
    records: Record[] = [{ name: 'Jozain Huldum', amount: 32000, status: 'active', watchers: [] }];

    constructor() {

        this.view = new Main(this);

    }

    toggleDrawer() {

        (<DrawerLayout>this.view.findById('layout')).toggleDrawer();

    }

    create() {

        let target = document.getElementById('modal');

        this.dialog = new CreateDialog(this);

        while (target.firstChild)
            target.removeChild(target.firstChild);

        target.appendChild(this.dialog.render());

    }

    save() {

        this.records.push(this.next);
        this.next = new Next();

        (<Modal>this.dialog.ids.modal).close();
        this.view.invalidate();

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

let app;

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
