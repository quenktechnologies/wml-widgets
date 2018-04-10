import * as ___wml from '@quenk/wml';
import {
    Tab
} from '..';



export class Main extends ___wml.AppView < Tab > {

    constructor(___context: Tab) {

        super(___context);

        this.template = (___view: ___wml.AppView < Tab > ) =>
            ___wml.node('li', {
                html: {
                    'class': ___context.values.root.class
                },
                wml: {
                    'id': ___context.values.root.id
                }
            }, [___wml.node('a', {
                html: {
                    'href': `#`,
                    'onclick': ___context.values.a.clicked
                },
                wml: {
                    'id': ___context.values.a.id
                }
            }, [(___context.values.a.text) ? ___wml.domify(___context.values.a.text) : ___wml.domify(___context.children)], ___view)], ___view);

    }

}