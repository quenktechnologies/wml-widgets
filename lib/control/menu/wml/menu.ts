import * as ___wml from '@quenk/wml';
import {
    Menu
} from '../';



export class Main extends ___wml.AppView < Menu > {

    constructor(___context: Menu) {

        super(___context);

        this.template = (___view: ___wml.AppView < Menu > ) =>
            ___wml.node('ul', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [___wml.domify(___context.values.content())], ___view);

    }

}