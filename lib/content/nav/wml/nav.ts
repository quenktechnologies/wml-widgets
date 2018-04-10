import * as ___wml from '@quenk/wml';
import {
    Nav
} from '../';



export class Main extends ___wml.AppView < Nav > {

    constructor(___context: Nav) {

        super(___context);

        this.template = (___view: ___wml.AppView < Nav > ) =>
            ___wml.node('ul', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}