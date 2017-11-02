import * as $wml from '@quenk/wml';
import {
    Menu
} from '../Menu';



export class Main extends $wml.AppView < Menu > {

    constructor(context: Menu) {

        super(context);

        this.template = (___context: Menu, ___view: $wml.AppView < Menu > ) =>
            $wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.domify(___context.values.content)], ___view);

    }

}