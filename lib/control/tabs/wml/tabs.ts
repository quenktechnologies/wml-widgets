import * as ___wml from '@quenk/wml';
import {
    Tabs as TabsContext
} from '../Tabs';;
import {
    Tab as TabContext
} from '../Tab';

export class Tab extends ___wml.AppView < TabContext > {

    constructor(context: TabContext) {

        super(context);

        this.template = (___context: TabContext, ___view: ___wml.AppView < TabContext > ) =>
            ___wml.node('li', {
                html: {
                    'class': ___context.values.class.li
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [___wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.clicked
                },
                wml: {
                    'id': ___context.values.id.a
                }
            }, [___wml.ifthen(___context.values.tab.text, function then() {
                return ___wml.domify(___context.values.tab.text)
            }, function else_clause() {
                return ___wml.domify(___context.children)
            })], ___view)], ___view);

    }

};
export class Tabs extends ___wml.AppView < TabsContext > {

    constructor(context: TabsContext) {

        super(context);

        this.template = (___context: TabsContext, ___view: ___wml.AppView < TabsContext > ) =>
            ___wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}