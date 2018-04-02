import * as ___wml from '@quenk/wml';
import {
    NavHeader
} from '../';



export class Main extends ___wml.AppView < NavHeader > {

    constructor(___context: NavHeader) {

        super(___context);

        this.template = (___view: ___wml.AppView < NavHeader > ) =>
            ___wml.node('span', {
                html: {
                    'class': ___context.values.span.class
                },
                wml: {}
            }, [(___context.values.text) ? ___wml.domify(___context.values.text) : ___wml.domify(___context.children)], ___view);

    }

}