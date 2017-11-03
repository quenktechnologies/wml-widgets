import * as ___wml from '@quenk/wml';
import {
    Menu
} from '../Menu';



export class Main extends ___wml.AppView < Menu > {

    constructor(context: Menu) {

        super(context);

        this.template = (___context: Menu, ___view: ___wml.AppView < Menu > ) =>
            ___wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.values.content)], ___view);

    }

}