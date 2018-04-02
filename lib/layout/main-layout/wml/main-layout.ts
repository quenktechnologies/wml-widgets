import * as ___wml from '@quenk/wml';
import {
    MainLayout
} from '..';



export class Main extends ___wml.AppView < MainLayout > {

    constructor(___context: MainLayout) {

        super(___context);

        this.template = (___view: ___wml.AppView < MainLayout > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}