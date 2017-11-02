import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Search
} from '@package/self/control/search/Search';;
import {
    SearchPage,
    Result
} from '../';



export class Main extends $wml.AppView < SearchPage > {

    constructor(context: SearchPage) {

        super(context);

        this.template = (___context: SearchPage, ___view: $wml.AppView < SearchPage > ) =>
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
            }, [$wml.widget(Search, {
                html: {},
                wml: {
                    'id': ___context.values.id
                },
                ww: {
                    'name': ___context.values.name,
                    'decorator': (r: Result) => r.value,
                    'onChange': ___context.onChange,
                    'onSelect': ___context.onSelect
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}