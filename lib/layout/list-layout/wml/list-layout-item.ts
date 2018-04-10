import * as ___wml from '@quenk/wml';
import {
    ListLayoutItem
} from '../';



export class Main extends ___wml.AppView < ListLayoutItem > {

    constructor(___context: ListLayoutItem) {

        super(___context);

        this.template = (___view: ___wml.AppView < ListLayoutItem > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}