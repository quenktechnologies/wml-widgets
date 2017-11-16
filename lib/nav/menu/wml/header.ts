import * as ___wml from '@quenk/wml';
import {
    Item
} from '../Item';;
import {
    Header
} from '../Header';



export class Main extends ___wml.AppView < Header > {

    constructor(___context: Header) {

        super(___context);

        this.template = (___view: ___wml.AppView < Header > ) =>
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
            }, [(___context.values.text) ? ___wml.domify(___context.values.text) : ___wml.domify(___context.children)], ___view)], ___view);

    }

}