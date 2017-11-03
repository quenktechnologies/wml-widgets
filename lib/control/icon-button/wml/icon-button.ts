import * as ___wml from '@quenk/wml';
import {
    IconButton
} from '../IconButton';



export class Main extends ___wml.AppView < IconButton > {

    constructor(context: IconButton) {

        super(context);

        this.template = (___context: IconButton, ___view: ___wml.AppView < IconButton > ) =>
            ___wml.node('button', {
                html: {
                    'class': ___context.values.button.class,
                    'onclick': ___context.values.button.onClick
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view);

    }

}