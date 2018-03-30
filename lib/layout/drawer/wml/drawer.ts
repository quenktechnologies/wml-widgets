import * as ___wml from '@quenk/wml';
import {
    Aside
} from '../../aside/Aside';;
import {
    Drawer
} from '../Drawer';



export class Main extends ___wml.AppView < Drawer > {

    constructor(___context: Drawer) {

        super(___context);

        this.template = (___view: ___wml.AppView < Drawer > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [___wml.widget(Aside, {
                html: {},
                wml: {
                    'id': ___context.values.id.drawer
                },
                ww: {
                    'content': ___context.values.aside.content
                }
            }, [], ___view), (___context.content) ? ___wml.domify(___context.content) : (___context.values.content) ? ___wml.domify(___context.values.content.render()) : ___wml.domify(___context.children)], ___view);

    }

}