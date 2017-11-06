import * as ___wml from '@quenk/wml';
import * as I from '../Item';



export class Main extends ___wml.AppView < I.Item > {

    constructor(context: I.Item) {

        super(context);

        this.template = (___context: I.Item, ___view: ___wml.AppView < I.Item > ) =>
            ___wml.node('li', {
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