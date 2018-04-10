import * as ___wml from '@quenk/wml';
import {
    Panel
} from '..';



export class Main extends ___wml.AppView < Panel > {

    constructor(___context: Panel) {

        super(___context);

        this.template = (___view: ___wml.AppView < Panel > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}