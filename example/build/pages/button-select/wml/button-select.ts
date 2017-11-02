import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    ButtonSelect,
    MultiButtonSelect
} from '@package/self/control/button-select';;
import {
    ButtonSelectPage
} from '../';



export class Main extends $wml.AppView < ButtonSelectPage > {

    constructor(context: ButtonSelectPage) {

        super(context);

        this.template = (___context: ButtonSelectPage, ___view: $wml.AppView < ButtonSelectPage > ) =>
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
            }, [$wml.text(`You selected: `), $wml.node('b', {
                html: {},
                wml: {
                    'id': `select-content`
                }
            }, [$wml.text(`(None)`)], ___view), $wml.text(`.`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(ButtonSelect, {
                html: {},
                wml: {
                    'id': `select`
                },
                ww: {
                    'name': `select`,
                    'variant': `-primary`,
                    'options': ___context.values.options,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view), $wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {}
            }, [$wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.text(`You can also use MultiButtonSelect instead: `), $wml.node('b', {
                html: {},
                wml: {
                    'id': `multi-content`
                }
            }, [$wml.text(`(None)`)], ___view), $wml.text(`.`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(MultiButtonSelect, {
                html: {},
                wml: {
                    'id': `multi`
                },
                ww: {
                    'name': `multi`,
                    'variant': `-primary`,
                    'options': ___context.values.options,
                    'onChange': ___context.onChange
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}