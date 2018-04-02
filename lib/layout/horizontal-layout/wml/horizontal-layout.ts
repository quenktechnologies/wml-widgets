import * as ___wml from '@quenk/wml';
import {
    HorizontalLayout
} from '..';



export class Main extends ___wml.AppView < HorizontalLayout > {

    constructor(___context: HorizontalLayout) {

        super(___context);

        this.template = (___view: ___wml.AppView < HorizontalLayout > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}