import * as $wml from '@quenk/wml';
import {
    Aside
} from '@package/self/layout/aside/Aside';;
import {
    Drawer
} from '../Drawer';;
import {
    Renderable
} from '@quenk/wml';



export class Main extends $wml.AppView < Drawer > {

    constructor(context: Drawer) {

        super(context);

        this.template = (___context: Drawer, ___view: $wml.AppView < Drawer > ) =>
            $wml.node('div', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {
                    'id': ___context.values.id.root
                }
            }, [$wml.widget(Aside, {
                html: {},
                wml: {
                    'id': ___context.values.id.drawer
                },
                ww: {
                    'content': $wml.read < Renderable > (`ww:drawer`, ___context.attrs)
                }
            }, [], ___view), $wml.ifthen(___context.content, function then() {
                return $wml.domify(___context.content)
            }, function elseif() {
                return $wml.ifthen($wml.read < Renderable > (`ww:content`, ___context.attrs), function then() {
                    return $wml.domify(___context.attrs.ww.content.render());
                }, function else_clause() {
                    return $wml.domify(___context.children)
                });
            })], ___view);

    }

}