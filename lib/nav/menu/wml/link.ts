import * as ___wml from '@quenk/wml';
import {
    Link
} from '@package/wml-widgets/nav/link';;
import {
    Link as LinkContext
} from '../Link';;
import {
    Item
} from '../Item';



export class Main extends ___wml.AppView < LinkContext > {

    constructor(___context: LinkContext) {

        super(___context);

        this.template = (___view: ___wml.AppView < LinkContext > ) =>
            ___wml.widget(Item, {
                html: {},
                wml: {},
                ww: {
                    'class': ___context.values.item.class
                }
            }, [___wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'class': ___context.values.a.class,
                    'name': ___context.values.a.name,
                    'title': ___context.values.a.title,
                    'href': ___context.values.a.href,
                    'text': ___context.values.a.text,
                    'active': ___context.values.a.active,
                    'onClick': ___context.values.a.onClick
                }
            }, [___wml.domify(___context.children)], ___view)], ___view);

    }

}