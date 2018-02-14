import * as ___wml from '@quenk/wml';
import {
    ButtonGroup
} from '../ButtonGroup';



export class Main extends ___wml.AppView < ButtonGroup > {

    constructor(___context: ButtonGroup) {

        super(___context);

        this.template = (___view: ___wml.AppView < ButtonGroup > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}