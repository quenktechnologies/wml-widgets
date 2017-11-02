import * as $wml from '@quenk/wml';
import {
    Text
} from '../Text';



export class Main extends $wml.AppView < Text > {

    constructor(context: Text) {

        super(context);

        this.template = (___context: Text, ___view: $wml.AppView < Text > ) =>
            $wml.node('span', {
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