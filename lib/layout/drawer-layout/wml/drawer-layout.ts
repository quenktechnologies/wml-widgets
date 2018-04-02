import * as ___wml from '@quenk/wml';
import {
    Drawer
} from '../../drawer';;
import {
    DrawerLayout
} from '..';



export class Main extends ___wml.AppView < DrawerLayout > {

    constructor(___context: DrawerLayout) {

        super(___context);

        this.template = (___view: ___wml.AppView < DrawerLayout > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [___wml.widget(Drawer, {
                html: {},
                wml: {
                    'id': ___context.values.drawer.id
                },
                ww: {
                    'content': ___context.values.drawer.content
                }
            }, [], ___view), ___wml.domify(___context.values.content.render())], ___view);

    }

}