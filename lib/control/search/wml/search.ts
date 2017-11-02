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
    Search
} from '../Search';;
import {
    Result
} from '../Result';

export const populated = < A extends Result > (option: A, _index: number, _options: A[]) => (___context: Search < A > ) => (___view: $wml.View) => $wml.domify(___context.values.item.decorator(option));;
export const empty = < A extends Result > () => (___context: Search < A > ) => (___view: $wml.View) => $wml.domify(`No results to display.`);;
export class Results < A extends Result > extends $wml.AppView < Search < A > > {

    constructor(context: Search < A > ) {

        super(context);

        this.template = (___context: Search < A > , ___view: $wml.AppView < Search < A > > ) =>
            $wml.widget(Fragment, {
                html: {},
                wml: {}
            }, [$wml.map(___context.values.search.results, function _map(option, index: number) {
                return $wml.widget(MenuItem, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': (`` + index),
                        'onClick': ___context.values.item.clicked
                    }
                }, [$wml.domify(___context.values.item.template.populated(option, index, ___context.values.search.results)(___context)(___view))], ___view)
            }, function otherwise() {
                return $wml.domify(___context.values.item.template.empty()(___context)(___view))
            })], ___view);

    }

}


export class Main < A extends Result > extends $wml.AppView < Search < A > > {

    constructor(context: Search < A > ) {

        super(context);

        this.template = (___context: Search < A > , ___view: $wml.AppView < Search < A > > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.node('input', {
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
            }, [], ___view), $wml.widget(Menu, {
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