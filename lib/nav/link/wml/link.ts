import * as $wml from '@quenk/wml';
import {
    Link
} from '../Link';



export class Main extends $wml.AppView < Link > {

    constructor(context: Link) {

        super(context);

        this.template = (___context: Link, ___view: $wml.AppView < Link > ) =>
            $wml.node('a', {
                html: {
                    'class': ___context.values.class.root,
                    'href': ___context.values.a.href,
                    'name': ___context.values.a.name,
                    'title': ___context.values.a.title,
                    'onclick': ___context.clicked
                },
                wml: {}
            }, [$wml.ifthen($wml.read < string > (`ww:text`, ___context.attrs), function then() {
                return $wml.domify($wml.read < string > (`ww:text`, ___context.attrs))
            }, function else_clause() {
                return $wml.domify(___context.children)
            })], ___view);

    }

}