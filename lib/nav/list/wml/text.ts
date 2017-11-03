import * as ___wml from '@quenk/wml';
import {
    Text
} from '../Text';



export class Main extends ___wml.AppView < Text > {

    constructor(context: Text) {

        super(context);

        this.template = (___context: Text, ___view: ___wml.AppView < Text > ) =>
            ___wml.node('span', {
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