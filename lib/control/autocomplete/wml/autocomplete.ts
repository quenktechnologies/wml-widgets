import * as $wml from '@quenk/wml';
import {
    Menu
} from '@package/self/menu/Menu';;
import {
    MenuItem
} from '@package/self/menu/MenuItem';;
import {
    Fragment
} from '@package/self/layout/fragment/Fragment';;
import {
    Autocomplete
} from '../Autocomplete';

export const populated = < V > (option: V, _index: number, _options: V[]) => (___context: Autocomplete < V > ) => (___view: $wml.View) => $wml.domify(___context.values.item.stringify(option));;
export const empty = < V > () => (___context: Autocomplete < V > ) => (___view: $wml.View) => $wml.domify(`No results to display.`);;
export class Results < V > extends $wml.AppView < Autocomplete < V > > {

    constructor(context: Autocomplete < V > ) {

        super(context);

        this.template = (___context: Autocomplete < V > , ___view: $wml.AppView < Autocomplete < V > > ) =>
            $wml.widget(Fragment, {
                html: {},
                wml: {}
            }, [$wml.map(___context.values.search.results, function _map(option, index: number) {
                return $wml.widget(MenuItem, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': (`` + index),
                        'onClick': () => ___context.values.item.click(index)
                    }
                }, [$wml.domify(___context.values.item.template.populated(option, index, ___context.values.search.results)(___context)(___view))], ___view)
            }, function otherwise() {
                return $wml.domify(___context.values.item.template.empty()(___context)(___view))
            })], ___view);

    }

}


export class Main < V > extends $wml.AppView < Autocomplete < V > > {

    constructor(context: Autocomplete < V > ) {

        super(context);

        this.template = (___context: Autocomplete < V > , ___view: $wml.AppView < Autocomplete < V > > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [$wml.node('input', {
                html: {
                    'type': `text`,
                    'class': ___context.values.input.class,
                    'onkeydown': ___context.values.input.onKeyDown,
                    'onkeyup': ___context.values.input.onKeyUp,
                    'oninput': ___context.values.input.onInput,
                    'placeholder': ___context.values.input.placeholder
                },
                wml: {
                    'id': ___context.values.input.id
                }
            }, [], ___view), $wml.widget(Menu, {
                html: {},
                wml: {
                    'id': ___context.values.menu.id
                },
                ww: {
                    'hidden': true
                }
            }, [], ___view)], ___view);

    }

}