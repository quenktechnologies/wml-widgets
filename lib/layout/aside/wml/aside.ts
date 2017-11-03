import * as $wml from '@quenk/wml';
import {
    Aside
} from '../Aside';



export class Main extends $wml.AppView < Aside > {

    constructor(context: Aside) {

        super(context);

        this.template = (___context: Aside, ___view: $wml.AppView < Aside > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [$wml.node('div', {
                html: {
                    'class': ___context.values.class.content
                },
                wml: {}
            }, [$wml.ifthen(___context.values.content, function then() {
                return $wml.domify(___context.values.content.render())
            }, function else_clause() {
                return $wml.domify(___context.children)
            })], ___view)], ___view);

    }

}