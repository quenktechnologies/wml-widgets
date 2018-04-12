import * as ___wml from '@quenk/wml';
import {
    ActionBar
} from '..';



export class Main extends ___wml.AppView < ActionBar > {

    constructor(___context: ActionBar) {

        super(___context);

        this.template = (___view: ___wml.AppView < ActionBar > ) =>
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
                wml: {
                    'id': ___context.values.content.id
                }
            }, [___wml.domify(___context.children)], ___view)], ___view);

    }

}