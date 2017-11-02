import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Date
} from '@package/self/control/date/Date';;
import {
    DatePage
} from '../';



export class Main extends $wml.AppView < DatePage > {

    constructor(context: DatePage) {

        super(context);

        this.template = (___context: DatePage, ___view: $wml.AppView < DatePage > ) =>
            $wml.widget(Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {}
            }, [$wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.text(`The date is : `), $wml.node('b', {
                html: {},
                wml: {
                    'id': `selected`
                }
            }, [$wml.text(`(None selected)`)], ___view), $wml.text(`.`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(Date, {
                html: {},
                wml: {
                    'id': `date`
                },
                ww: {
                    'name': `date`,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}