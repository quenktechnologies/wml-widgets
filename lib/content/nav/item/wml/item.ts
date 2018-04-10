import * as ___wml from '@quenk/wml';
import {
    Item
} from '..';



export class Main extends ___wml.AppView < Item > {

    constructor(___context: Item) {

        super(___context);

        this.template = (___view: ___wml.AppView < Item > ) =>
            ___wml.node('li', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.values.content.render())], ___view);

    }

}