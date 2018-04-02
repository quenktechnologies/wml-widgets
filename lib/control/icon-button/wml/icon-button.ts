import * as ___wml from '@quenk/wml';
import {
    IconButton
} from '..';



export class Main extends ___wml.AppView < IconButton > {

    constructor(___context: IconButton) {

        super(___context);

        this.template = (___view: ___wml.AppView < IconButton > ) =>
            ___wml.node('button', {
                html: {
                    'class': ___context.values.button.class,
                    'onclick': ___context.values.button.onClick
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}