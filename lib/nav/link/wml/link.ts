import * as ___wml from '@quenk/wml';
import {
    Link
} from '../Link';



export class Main extends ___wml.AppView < Link > {

    constructor(context: Link) {

        super(context);

        this.template = (___context: Link, ___view: ___wml.AppView < Link > ) =>
            ___wml.node('a', {
                html: {
                    'class': ___context.values.class.root,
                    'href': ___context.values.a.href,
                    'title': ___context.values.a.title,
                    'onclick': ___context.clicked
                },
                wml: {}
            }, [___wml.ifthen(___context.values.a.text, function then() {
                return ___wml.domify(___context.values.a.text)
            }, function else_clause() {
                return ___wml.domify(___context.children)
            })], ___view);

    }

}