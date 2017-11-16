import * as ___wml from '@quenk/wml';
import {
    ActionBar
} from '../ActionBar';



export class Main extends ___wml.AppView < ActionBar > {

    constructor(___context: ActionBar) {

        super(___context);

        this.template = (___view: ___wml.AppView < ActionBar > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.node('div', {
                html: {
                    'class': ___context.values.class.content
                },
                wml: {
                    'id': ___context.values.id.content
                }
            }, [___wml.domify(___context.children)], ___view)], ___view);

    }

}