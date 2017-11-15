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
    Search
} from '../Search';;
import {
    Result
} from '../Result';

export const populated = < A extends Result > (___context: Search < A > ) => (option: A) => (_index: number) => (_options: A[]) => (___view: ___wml.View) => ___wml.domify(___context.values.item.decorator(option));;
export const empty = < A extends Result > (___context: Search < A > ) => (___view: ___wml.View) => ___wml.domify(`No results to display.`);;
export class Results < A extends Result > extends ___wml.AppView < Search < A > > {

    constructor(context: Search < A > ) {

        super(context);

        this.template = (___context: Search < A > , ___view: ___wml.AppView < Search < A > > ) =>
            ___wml.widget(Fragment, {
                html: {},
                wml: {}
            }, [___wml.map(___context.values.search.results, function _map(option, index: number) {
                return ___wml.widget(MenuItem, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': (`` + index),
                        'onClick': ___context.values.item.clicked
                    }
                }, [___wml.domify(___context.values.item.template.populated(___context)(option)(index)(___context.values.search.results)(___view))], ___view)
            }, function otherwise() {
                return ___wml.domify(___context.values.item.template.empty(___context)(___view))
            })], ___view);

    }

}


export class Main < A extends Result > extends ___wml.AppView < Search < A > > {

    constructor(context: Search < A > ) {

        super(context);

        this.template = (___context: Search < A > , ___view: ___wml.AppView < Search < A > > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.node('input', {
                html: {
                    'type': `text`,
                    'class': ___context.values.class.input,
                    'onkeydown': ___context.values.input.onKeyDown,
                    'onkeyup': ___context.values.input.onKeyUp,
                    'oninput': ___context.values.input.onInput,
                    'placeholder': ___context.values.input.placeholder
                },
                wml: {
                    'id': ___context.values.id.input
                }
            }, [], ___view), ___wml.widget(Menu, {
                html: {},
                wml: {
                    'id': ___context.values.id.menu
                },
                ww: {
                    'hidden': true
                }
            }, [], ___view)], ___view);

    }

}