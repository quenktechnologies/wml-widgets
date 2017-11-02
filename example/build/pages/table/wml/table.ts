import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Table
} from '@package/self/table/table/Table';;
import {
    TablePage
} from '../';



export class Main extends $wml.AppView < TablePage > {

    constructor(context: TablePage) {

        super(context);

        this.template = (___context: TablePage, ___view: $wml.AppView < TablePage > ) =>
            $wml.widget(Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {}
            }, [$wml.widget(Table, {
                html: {},
                wml: {},
                ww: {
                    'selectable': true,
                    'data': ___context.values.users,
                    'fields': ___context.values.fields
                }
            }, [], ___view)], ___view)], ___view)], ___view);

    }

}