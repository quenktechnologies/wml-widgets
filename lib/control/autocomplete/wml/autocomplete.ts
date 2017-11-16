import * as ___wml from '@quenk/wml';
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
} from '../Autocomplete';;
import {
    label,
    message
} from '@package/self/control/wml';

export const populated = < V > (___context: Autocomplete < V > ) => (option: V) => (_index: number) => (_options: V[]) => (___view: ___wml.View) => ___wml.domify(___context.values.item.stringify(option));;
export const empty = < V > (___context: Autocomplete < V > ) => (___view: ___wml.View) => ___wml.domify(`No results to display.`);;
export class Results < V > extends ___wml.AppView < Autocomplete < V > > {

    constructor(___context: Autocomplete < V > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < Autocomplete < V > > ) =>
            ___wml.widget(Fragment, {
                html: {},
                wml: {}
            }, [___wml.map(___context.values.search.results, function _map(option, index: number) {
                return ___wml.widget(MenuItem, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': (`` + index),
                        'onClick': () => ___context.values.item.click(index)
                    }
                }, [___wml.domify(___context.values.item.template.populated(___context)(option)(index)(___context.values.search.results)(___view))], ___view)
            }, function otherwise() {
                return ___wml.domify(___context.values.item.template.empty(___context)(___view))
            })], ___view);

    }

}


export class Main < V > extends ___wml.AppView < Autocomplete < V > > {

    constructor(___context: Autocomplete < V > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < Autocomplete < V > > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(label(___context.values.label.id)(___context.values.label.text)(___view)), ___wml.node('input', {
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
            }, [], ___view), ___wml.widget(Menu, {
                html: {},
                wml: {
                    'id': ___context.values.menu.id
                },
                ww: {
                    'hidden': true
                }
            }, [], ___view), ___wml.domify(message(___context.values.help.id)(___context.values.help)(___view))], ___view);

    }

}