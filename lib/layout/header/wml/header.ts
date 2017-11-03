import * as ___wml from '@quenk/wml';
import {
    Header
} from '../Header';



export class Main extends ___wml.AppView < Header > {

    constructor(context: Header) {

        super(context);

        this.template = (___context: Header, ___view: ___wml.AppView < Header > ) =>
            ___wml.node('header', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.ifthen(___context.values.text, function then() {
                return ___wml.domify(___context.values.text)
            }, function else_clause() {
                return ___wml.domify(___context.children)
            })], ___view);

    }

}