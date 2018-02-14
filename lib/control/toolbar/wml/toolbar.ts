import * as ___wml from '@quenk/wml';
import {
    Toolbar
} from '..';



export class Main extends ___wml.AppView < Toolbar > {

    constructor(___context: Toolbar) {

        super(___context);

        this.template = (___view: ___wml.AppView < Toolbar > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}