import * as ___wml from '@quenk/wml';
import {
    Drawer
} from '@package/wml-widgets/layout/drawer/Drawer';;
import {
    ActionBar
} from '@package/wml-widgets/app/action-bar/ActionBar';;
import {
    App
} from '../app';;
import {
    IconButton
} from '@package/wml-widgets/control/icon-button/IconButton';;
import {
    Dash
} from '@package/wml-widgets/app/dash';;
import {
    Main as MainLayout
} from '@package/wml-widgets/layout/main/Main';



export class Main extends ___wml.AppView < App > {

    constructor(___context: App) {

        super(___context);

        this.template = (___view: ___wml.AppView < App > ) =>
            ___wml.widget(Drawer, {
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
            }, [___wml.widget(IconButton, {
                html: {},
                wml: {},
                ww: {
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
            }, [___wml.domify(___context.content.render())], ___view)], ___view);

    }

}