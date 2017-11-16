import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Table
} from '@package/self/table/Table';;
import {
    TablePage
} from '../';



export class Main extends ___wml.AppView < TablePage > {

    constructor(___context: TablePage) {

        super(___context);

        this.template = (___view: ___wml.AppView < TablePage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
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
            }, [], ___view)], ___view)], ___view)], ___view);

    }

}