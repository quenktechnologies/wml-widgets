import * as ___wml from '@quenk/wml';
import {
    Tabs,
    Tab
} from '@package/wml-widgets/control/tabs';;
import {
    TabView
} from '..';



export class Main extends ___wml.AppView < TabView > {

    constructor(___context: TabView) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabView > ) =>
            ___wml.node('div', {
                html: {},
                wml: {},
                ww: {
                    'class': ___context.values.root.class
                }
            }, [___wml.widget(Tabs, {
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
                }, [(tab.tabContent) ? ___wml.domify(tab.tabContent(___context)(___view)) : (tab.text) ? ___wml.domify(tab.text) : ___wml.domify(name)], ___view)
            }, function otherwise() {
                return document.createDocumentFragment();
            })], ___view), (___context.values.content) ? ___wml.domify(___context.values.content) : ___wml.domify(___context.children)], ___view);

    }

}