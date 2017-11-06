import * as ___wml from '@quenk/wml';
import {
    Item
} from '../Item';;
import {
    Header
} from '../Header';



export class Main extends ___wml.AppView < Header > {

    constructor(context: Header) {

        super(context);

        this.template = (___context: Header, ___view: ___wml.AppView < Header > ) =>
            ___wml.widget(Item, {
                html: {},
                wml: {},
                ww: {
                    'class': ___context.values.item.class
                }
            }, [___wml.node('span', {
                html: {
                    'class': ___context.values.span.class
                },
                wml: {}
            }, [___wml.ifthen(___context.values.text, function then() {
                return ___wml.domify(___context.values.text)
            }, function else_clause() {
                return ___wml.domify(___context.children)
            })], ___view)], ___view);

    }

}