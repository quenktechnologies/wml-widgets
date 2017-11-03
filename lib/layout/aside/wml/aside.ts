import * as ___wml from '@quenk/wml';
import {
    Aside
} from '../Aside';



export class Main extends ___wml.AppView < Aside > {

    constructor(context: Aside) {

        super(context);

        this.template = (___context: Aside, ___view: ___wml.AppView < Aside > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [___wml.node('div', {
                html: {
                    'class': ___context.values.class.content
                },
                wml: {}
            }, [___wml.ifthen(___context.values.content, function then() {
                return ___wml.domify(___context.values.content.render())
            }, function else_clause() {
                return ___wml.domify(___context.children)
            })], ___view)], ___view);

    }

}