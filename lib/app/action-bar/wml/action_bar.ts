import * as $wml from '@quenk/wml';
import {
    ActionBar
} from '../ActionBar';



export class Main extends $wml.AppView < ActionBar > {

    constructor(context: ActionBar) {

        super(context);

        this.template = (___context: ActionBar, ___view: $wml.AppView < ActionBar > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.node('div', {
                html: {
                    'class': ___context.values.class.content
                },
                wml: {
                    'id': ___context.values.id.content
                }
            }, [$wml.domify(___context.children)], ___view)], ___view);

    }

}