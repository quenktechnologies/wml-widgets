import * as ___wml from '@quenk/wml';
import {
    SubMenu
} from '../SubMenu';;
import {
    Item
} from '../Item';



export class Main extends ___wml.AppView < SubMenu > {

    constructor(___context: SubMenu) {

        super(___context);

        this.template = (___view: ___wml.AppView < SubMenu > ) =>
            ___wml.widget(Item, {
                html: {},
                wml: {}
            }, [___wml.node('ul', {
                html: {
                    'class': ___context.values.class.root
                },
                wml: {}
            }, [___wml.domify(___context.children)], ___view)], ___view);

    }

}