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

export class Next {

    constructor(
        public name: string = '',
        public amount: number = 0,
        public status: string = '',
        public watchers: number[] = []) { }

}

const fields: Field<Next>[] = [
    { name: 'number', heading: 'Number' },
    { name: 'name', heading: 'Name' },
    { name: 'amount', heading: 'Amount' },
    { name: 'status', heading: 'Status' },
    { name: 'watching', heading: 'Watching' }
];

class Application {

    drawer: DrawerLayout;
    dialog: CreateDialog<Application>;
    view: Main<Application>;
    fields: Field<Next>[] = fields;
    tableModel = new SortTableModel();
    next: Next = new Next();
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

let app: Application;
app = Application.main();
app.run();

let layout = (<DrawerLayout>app.view.findById('layout'));
let drawer = <HTMLElement>document.getElementsByClassName(Styles.DRAWER)[0];

layout.toggleDrawer();

