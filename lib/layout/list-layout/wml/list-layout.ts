import * as ___wml from '@quenk/wml';
import {
    ListLayout
} from '../';



export class Main extends ___wml.AppView < ListLayout > {

    constructor(___context: ListLayout) {

        super(___context);

        this.template = (___view: ___wml.AppView < ListLayout > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.content.class
                },
                wml: {
                    'id': ___context.values.content.id
                }
            }, [___wml.domify(___context.children)], ___view);

    }

}