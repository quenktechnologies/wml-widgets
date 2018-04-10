import * as ___wml from '@quenk/wml';
import {
    DrawerLayout
} from '../../../lib/layout/drawer-layout';;
import {
    ActionBar
} from '../../../lib/app/action-bar';;
import {
    App
} from '../app';;
import {
    Button
} from '../../../lib/control/button';;
import {
    Dash
} from '../../../lib/app/dash';;
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
            }, [___wml.widget(Button, {
                html: {},
                wml: {},
                ww: {
                    'name': `toggle`,
                    'onClick': ___context.toggleDrawer
                }
            }, [___wml.widget(Dash, {
                html: {},
                wml: {}
            }, [], ___view), ___wml.widget(Dash, {
                html: {},
                wml: {}
            }, [], ___view), ___wml.widget(Dash, {
                html: {},
                wml: {}
            }, [], ___view)], ___view)], ___view), ___wml.widget(MainLayout, {
                html: {},
                wml: {}
            }, [(___context.content) ? ___wml.domify(___context.content.render()) : ___wml.domify(``)], ___view)], ___view);

    }

}