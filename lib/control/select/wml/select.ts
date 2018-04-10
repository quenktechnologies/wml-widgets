import * as ___wml from '@quenk/wml';
import {
    Search
} from '../../search';;
import {
    Menu,
    Item
} from '../../menu';;
import {
    Link
} from '../../../content/nav/link';;
import {
    Fragment
} from '../../../layout/fragment';;
import {
    label,
    message
} from '../../wml';;
import {
    Select
} from '../';

export const itemContentTemplate = < V > (___context: Select < V > ) => (option: V) => (_index: number) => (___view: ___wml.View) => ___wml.domify(___context.values.item.stringify(option));;
export const noItemsTemplate = < V > (___context: Select < V > ) => (___view: ___wml.View) => ___wml.domify(`No results to display.`);;
export class Results < V > extends ___wml.AppView < Select < V > > {

    constructor(___context: Select < V > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < Select < V > > ) =>
            ___wml.widget(Fragment, {
                html: {},
                wml: {}
            }, [___wml.map(___context.values.menu.options, function _map(option, index: number) {
                return ___wml.widget(Item, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': (`` + index)
                    }
                }, [___wml.widget(Link, {
                    html: {},
                    wml: {},
                    ww: {
                        'onClick': () => ___context.values.item.click(index)
                    }
                }, [___wml.domify(___context.values.item.itemContentTemplate()(___context)(option)(index)(___view))], ___view)], ___view)
            }, function otherwise() {
                return ___wml.domify(___context.values.item.noItemsTemplate()(___context)(___view))
            })], ___view);

    }

}


export class Main < V > extends ___wml.AppView < Select < V > > {

    constructor(___context: Select < V > ) {

        super(___context);

        this.template = (___view: ___wml.AppView < Select < V > > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(label(___context.values.label.id)(___context.values.label.text)(___view)), ___wml.widget(Search, {
                html: {},
                wml: {
                    'id': ___context.values.search.id
                },
                ww: {
                    'class': ___context.values.search.class,
                    'placeholder': ___context.values.search.placeholder,
                    'readOnly': ___context.values.search.readOnly,
                    'onEscape': ___context.values.search.onEscape,
                    'onFocus': ___context.values.search.onFocus,
                    'onSearch': ___context.values.search.onSearch
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