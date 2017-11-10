import * as ___wml from '@quenk/wml';
import {
    ListGroup
} from '../ListGroup';



export class Main extends ___wml.AppView < ListGroup > {

    constructor(context: ListGroup) {

        super(context);

        this.template = (___context: ListGroup, ___view: ___wml.AppView < ListGroup > ) =>
            ___wml.node('ul', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}