import * as $wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '@package/self/layout/grid/Grid';;
import {
    Tabs
} from '@package/self/control/tabs/Tabs';;
import {
    Tab
} from '@package/self/control/tabs/Tab';;
import {
    TabsPage
} from '../';



export class Main extends $wml.AppView < TabsPage > {

    constructor(context: TabsPage) {

        super(context);

        this.template = (___context: TabsPage, ___view: $wml.AppView < TabsPage > ) =>
            $wml.widget(Grid, {
                html: {},
                wml: {}
            }, [$wml.widget(Row, {
                html: {},
                wml: {}
            }, [$wml.widget(Column, {
                html: {},
                wml: {}
            }, [$wml.widget(Tabs, {
                html: {},
                wml: {}
            }, [$wml.widget(Tab, {
                html: {},
                wml: {},
                ww: {
                    'active': (___context.tab === `First`),
                    'text': `First`,
                    'name': `First`,
                    'onClick': ___context.clicked
                }
            }, [], ___view), $wml.widget(Tab, {
                html: {},
                wml: {},
                ww: {
                    'active': (___context.tab === `Second`),
                    'text': `Second`,
                    'name': `Second`,
                    'onClick': ___context.clicked
                }
            }, [], ___view), $wml.widget(Tab, {
                html: {},
                wml: {},
                ww: {
                    'active': (___context.tab === `Third`),
                    'text': `Third`,
                    'name': `Third`,
                    'onClick': ___context.clicked
                }
            }, [], ___view)], ___view), $wml.node('p', {
                html: {},
                wml: {
                    'id': `content`
                }
            }, [$wml.domify(___context.content)], ___view)], ___view)], ___view)], ___view);

    }

}