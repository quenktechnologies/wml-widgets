import * as ___wml from '@quenk/wml';
import {
    Drawer
} from '..';



export class Main extends ___wml.AppView < Drawer > {

    constructor(___context: Drawer) {

        super(___context);

        this.template = (___view: ___wml.AppView < Drawer > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [___wml.node('div', {
                html: {
                    'class': ___context.values.content.class
                },
                wml: {}
            }, [___wml.domify(___context.values.content.render())], ___view)], ___view);

    }

}