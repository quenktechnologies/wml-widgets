import * as $wml from '@quenk/wml';
import {
    Drawer
} from '@package/self/layout/drawer/Drawer';;
import {
    ActionBar
} from '@package/self/app/action-bar/ActionBar';;
import {
    App
} from '../app';;
import {
    IconButton
} from '@package/self/control/icon-button/IconButton';;
import {
    Dash
} from '@package/self/app/dash';;
import {
    Main as MainLayout
} from '@package/self/layout/main/Main';



export class Main extends $wml.AppView < App > {

    constructor(context: App) {

        super(context);

        this.template = (___context: App, ___view: $wml.AppView < App > ) =>
            $wml.widget(Drawer, {
                html: {},
                wml: {
                    'id': ___context.values.id.layout
                },
                ww: {
                    'drawer': ___context.navigation
                }
            }, [$wml.widget(ActionBar, {
                html: {},
                wml: {}
            }, [$wml.widget(IconButton, {
                html: {},
                wml: {},
                ww: {
                    'onClick': ___context.toggleDrawer
                }
            }, [$wml.widget(Dash, {
                html: {},
                wml: {}
            }, [], ___view), $wml.widget(Dash, {
                html: {},
                wml: {}
            }, [], ___view), $wml.widget(Dash, {
                html: {},
                wml: {}
            }, [], ___view)], ___view)], ___view), $wml.widget(MainLayout, {
                html: {},
                wml: {}
            }, [$wml.domify(___context.content.render())], ___view)], ___view);

    }

}