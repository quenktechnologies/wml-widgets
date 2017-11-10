import * as ___wml from '@quenk/wml';
import {
    ListGroupItem
} from '../ListGroupItem';



export class Main extends ___wml.AppView < ListGroupItem > {

    constructor(context: ListGroupItem) {

        super(context);

        this.template = (___context: ListGroupItem, ___view: ___wml.AppView < ListGroupItem > ) =>
            ___wml.node('li', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}