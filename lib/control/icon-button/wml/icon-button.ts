import * as $wml from '@quenk/wml';
import {
    IconButton
} from '../IconButton';



export class Main extends $wml.AppView < IconButton > {

    constructor(context: IconButton) {

        super(context);

        this.template = (___context: IconButton, ___view: $wml.AppView < IconButton > ) =>
            $wml.node('button', {
                html: {
                    'class': ___context.values.class.root,
                    'onclick': ___context.values.button.onClick
                },
                wml: {}
            }, [$wml.domify(___context.children)], ___view);

    }

}