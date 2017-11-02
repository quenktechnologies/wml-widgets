import * as $wml from '@quenk/wml';
import {
    Header
} from '../Header';



export class Main extends $wml.AppView < Header > {

    constructor(context: Header) {

        super(context);

        this.template = (___context: Header, ___view: $wml.AppView < Header > ) =>
            $wml.node('header', {
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