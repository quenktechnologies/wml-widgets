import * as ___wml from '@quenk/wml';
import {
    Aside
} from '@package/self/layout/aside/Aside';;
import {
    Drawer
} from '../Drawer';



export class Main extends ___wml.AppView < Drawer > {

    constructor(context: Drawer) {

        super(context);

        this.template = (___context: Drawer, ___view: ___wml.AppView < Drawer > ) =>
            ___wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [___wml.widget(Aside, {
                html: {},
                wml: {
                    'id': ___context.values.id.drawer
                },
                ww: {
                    'content': ___context.values.aside.content
                }
            }, [], ___view), ___wml.ifthen(___context.content, function then() {
                return ___wml.domify(___context.content)
            }, function elseif() {
                return ___wml.ifthen(___context.values.content, function then() {
                    return ___wml.domify(___context.values.content.render());
                }, function else_clause() {
                    return ___wml.domify(___context.children)
                });
            })], ___view);

    }

}