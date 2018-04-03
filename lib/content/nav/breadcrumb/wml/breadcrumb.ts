import * as ___wml from '@quenk/wml';
import {
    Breadcrumb
} from '..';



export class Main extends ___wml.AppView < Breadcrumb > {

    constructor(___context: Breadcrumb) {

        super(___context);

        this.template = (___view: ___wml.AppView < Breadcrumb > ) =>
            ___wml.node('ol', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}