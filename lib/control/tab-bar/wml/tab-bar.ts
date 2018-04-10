import * as ___wml from '@quenk/wml';
import {
    TabBar
} from '..';



export class Main extends ___wml.AppView < TabBar > {

    constructor(___context: TabBar) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabBar > ) =>
            ___wml.node('ul', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}