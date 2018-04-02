import * as ___wml from '@quenk/wml';
import {
    ListGroupItem
} from '../ListGroupItem';



export class Main extends ___wml.AppView < ListGroupItem > {

    constructor(___context: ListGroupItem) {

        super(___context);

        this.template = (___view: ___wml.AppView < ListGroupItem > ) =>
            ___wml.node('li', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}