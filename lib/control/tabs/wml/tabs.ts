import * as $wml from '@quenk/wml';
import {
    Tabs as TabsContext
} from '../Tabs';;
import {
    Tab as TabContext
} from '../Tab';

export class Tab extends $wml.AppView < TabContext > {

    constructor(context: TabContext) {

        super(context);

        this.template = (___context: TabContext, ___view: $wml.AppView < TabContext > ) =>
            $wml.node('li', {
                html: {
                    'class': ___context.values.class.li
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [$wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.clicked
                },
                wml: {
                    'id': ___context.values.id.a
                }
            }, [$wml.ifthen($wml.read < string > (`ww:text`, ___context.attrs), function then() {
                return $wml.domify(___context.attrs.ww.text)
            }, function else_clause() {
                return $wml.domify(___context.children)
            })], ___view)], ___view);

    }

};
export class Tabs extends $wml.AppView < TabsContext > {

    constructor(context: TabsContext) {

        super(context);

        this.template = (___context: TabsContext, ___view: $wml.AppView < TabsContext > ) =>
            $wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

}