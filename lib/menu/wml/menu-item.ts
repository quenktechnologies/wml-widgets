import * as $wml from '@quenk/wml';
import {
    MenuItem
} from '../MenuItem';



export class Main extends $wml.AppView < MenuItem > {

    constructor(context: MenuItem) {

        super(context);

        this.template = (___context: MenuItem, ___view: $wml.AppView < MenuItem > ) =>
            $wml.node('li', {
                html: {
                    'class': ___context.values.class.root,
                    'onclick': ___context.values.clicked
                },
                wml: {}
            }, [$wml.ifthen(___context.values.text, function then() {
                return $wml.domify(___context.values.text)
            }, function else_clause() {
                return $wml.domify(___context.children)
            })], ___view);

    }

}