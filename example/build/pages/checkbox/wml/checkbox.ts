import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Checkbox
} from '@package/self/control/checkbox/Checkbox';;
import {
    CheckboxPage
} from '../';



export class Main extends $wml.AppView < CheckboxPage > {

    constructor(context: CheckboxPage) {

        super(context);

        this.template = (___context: CheckboxPage, ___view: $wml.AppView < CheckboxPage > ) =>
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
            }, [$wml.text(`The checkbox is `), $wml.node('b', {
                html: {},
                wml: {
                    'id': `content`
                }
            }, [$wml.text(`untouched`)], ___view), $wml.text(`.`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(Checkbox, {
                html: {},
                wml: {},
                ww: {
                    'name': `checkbox`,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}