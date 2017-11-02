import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Autocomplete
} from '@package/self/control/autocomplete';;
import {
    AutocompletePage,
    Result
} from '../';



export class Main extends $wml.AppView < AutocompletePage > {

    constructor(context: AutocompletePage) {

        super(context);

        this.template = (___context: AutocompletePage, ___view: $wml.AppView < AutocompletePage > ) =>
            $wml.widget(Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {},
                ww: {
                    'size': 6
                }
            }, [$wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.text(`You selected: `), $wml.node('b', {
                html: {},
                wml: {
                    'id': `selected`
                }
            }, [$wml.text(`(nothing)`)], ___view), $wml.text(`.`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(Autocomplete, {
                html: {},
                wml: {
                    'id': ___context.values.id
                },
                ww: {
                    'name': ___context.values.name,
                    'stringifier': (r: Result) => r.value,
                    'onSearch': ___context.onSearch,
                    'onSelect': ___context.onSelect
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}