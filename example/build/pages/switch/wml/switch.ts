import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Switch
} from '@package/self/control/switch/Switch';;
import {
    SwitchPage
} from '../';



export class Main extends $wml.AppView < SwitchPage > {

    constructor(context: SwitchPage) {

        super(context);

        this.template = (___context: SwitchPage, ___view: $wml.AppView < SwitchPage > ) =>
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
            }, [$wml.text(`The switch is `), $wml.node('b', {
                html: {},
                wml: {
                    'id': `content`
                }
            }, [$wml.text(`untouched`)], ___view), $wml.text(`.`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(Switch, {
                html: {},
                wml: {},
                ww: {
                    'name': `switch`,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}