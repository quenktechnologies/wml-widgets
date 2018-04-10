import * as ___wml from '@quenk/wml';
import {
    Header
} from '..';



export class Main extends ___wml.AppView < Header > {

    constructor(___context: Header) {

        super(___context);

        this.template = (___view: ___wml.AppView < Header > ) =>
            ___wml.node('header', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [(___context.values.text) ? ___wml.domify(___context.values.text) : ___wml.domify(___context.children)], ___view);

    }

}