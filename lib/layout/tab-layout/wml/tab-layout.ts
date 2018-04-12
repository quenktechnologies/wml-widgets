import * as ___wml from '@quenk/wml';
import {
    Content
} from '@quenk/wml';;
import {
    Fragment
} from '../../fragment';;
import {
    TabBar,
    Tab
} from '../../../control/tab-bar';;
import {
    TabLayout
} from '..';

export const empty = (___context: TabLayout) => (___view: ___wml.View) => ___wml.widget(Fragment, {
    html: {},
    wml: {}
}, [], ___view);;
export const content = (c: Content) => (_: TabLayout) => (___view: ___wml.View) => ___wml.domify(c);

export class Main extends ___wml.AppView < TabLayout > {

    constructor(___context: TabLayout) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabLayout > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.widget(TabBar, {
                html: {},
                wml: {}
            }, [___wml.map(___context.values.tabs, function _map(tab, name: string) {
                return ___wml.widget(Tab, {
                    html: {},
                    wml: {},
                    ww: {
                        'name': name,
                        'active': (___context.values.tab === name),
                        'onClick': ___context.values.onClick
                    }
                }, [(tab.tabTemplate) ? ___wml.domify(tab.tabTemplate(___context)(___view)) : (tab.text) ? ___wml.domify(tab.text) : ___wml.domify(name)], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view), (___context.values.content) ? ___wml.domify(___context.values.content(___context)(___view)) : ___wml.domify(___context.children)], ___view);

    }

}