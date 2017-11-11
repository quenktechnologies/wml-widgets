import * as ___wml from '@quenk/wml';
import {
    Group
} from '../Group';



export class Main extends ___wml.AppView < Group > {

    constructor(context: Group) {

        super(context);

        this.template = (___context: Group, ___view: ___wml.AppView < Group > ) =>
            ___wml.node('div', {
                html: {
                    'id': ___context.values.root.id,
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.values.root.content)], ___view);

    }

}