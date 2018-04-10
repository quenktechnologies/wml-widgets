import * as ___wml from '@quenk/wml';
import {
    PageExample
} from '../../../page-example';;
import {
    Table
} from '../../../../../lib/data/table/Table';;
import {
    TablePage
} from '../';



export class Main extends ___wml.AppView < TablePage > {

    constructor(___context: TablePage) {

        super(___context);

        this.template = (___view: ___wml.AppView < TablePage > ) =>
            ___wml.widget(PageExample, {
                html: {},
                wml: {}
            }, [___wml.widget(Table, {
                html: {},
                wml: {},
                ww: {
                    'selectable': true,
                    'data': ___context.values.users,
                    'columns': ___context.values.columns,
                    'onCellClicked': ___context.values.onCellClicked
                }
            }, [], ___view)], ___view);

    }

}