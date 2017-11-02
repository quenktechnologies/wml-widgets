import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    SearchStack
} from '@package/self/control/search-stack/SearchStack';;
import {
    SearchStackPage,
    Result
} from '../';



export class Main extends $wml.AppView < SearchStackPage > {

    constructor(context: SearchStackPage) {

        super(context);

        this.template = (___context: SearchStackPage, ___view: $wml.AppView < SearchStackPage > ) =>
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
                    'id': `text`
                }
            }, [$wml.domify(___context.values.text())], ___view), $wml.text(`.`)], ___view), $wml.node('p', {
                html: {},
                wml: {}
            }, [$wml.widget(SearchStack, {
                html: {},
                wml: {
                    'id': ___context.values.id
                },
                ww: {
                    'name': ___context.values.name,
                    'value': ___context.values.selected,
                    'decorator': (r: Result) => r.label,
                    'onChange': ___context.onChange,
                    'onSearch': ___context.onSearch
                }
            }, [], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}