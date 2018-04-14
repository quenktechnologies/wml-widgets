import * as ___wml from '@quenk/wml';
import {
    DrawerLayout
} from '../../../lib/layout/drawer-layout';;
import {
    ActionBar
} from '../../../lib/layout/action-bar';;
import {
    App
} from '../app';;
import {
    Link
} from '../../../lib/content/nav/link';;
import {
    Button
} from '../../../lib/control/button';;
import {
    MenuIcon
} from '../../../lib/content/x/menu-icon';;
import {
    MainLayout
} from '../../../lib/layout/main-layout';



export class Main extends ___wml.AppView < App > {

    constructor(___context: App) {

        super(___context);

        this.template = (___view: ___wml.AppView < App > ) =>
            ___wml.widget(DrawerLayout, {
                html: {},
                wml: {
                    'id': ___context.values.id.layout
                },
                ww: {
                    'drawer': ___context.navigation
                }
            }, [___wml.widget(ActionBar, {
                html: {},
                wml: {}
            }, [___wml.widget(Link, {
                html: {},
                wml: {},
                ww: {
                    'onClick': ___context.toggleDrawer
                }
            }, [___wml.widget(MenuIcon, {
                html: {},
                wml: {}
            }, [], ___view)], ___view)], ___view), ___wml.widget(MainLayout, {
                html: {},
                wml: {}
            }, [(___context.content) ? ___wml.domify(___context.content.render()) : ___wml.domify(``)], ___view)], ___view);

    }

}