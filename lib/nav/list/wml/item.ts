import * as $wml from '@quenk/wml';
import * as I from '../Item';



export class Main extends $wml.AppView < I.Item > {

    constructor(context: I.Item) {

        super(context);

        this.template = (___context: I.Item, ___view: $wml.AppView < I.Item > ) =>
            $wml.node('li', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [$wml.ifthen(___context.values.text, function then() {
                return $wml.domify(___context.values.text)
            }, function else_clause() {
                return $wml.domify(___context.children)
            })], ___view);

    }

}