import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '../../../../../lib/layout/grid/Grid';;
import {
    Tabs
} from '../../../../../lib/control/tabs/Tabs';;
import {
    Tab
} from '../../../../../lib/control/tabs/Tab';;
import {
    TabsPage
} from '../';



export class Main extends ___wml.AppView < TabsPage > {

    constructor(___context: TabsPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabsPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.widget(Tabs, {
                html: {},
                wml: {}
            }, [___wml.widget(Tab, {
                html: {},
                wml: {},
                ww: {
                    'active': (___context.tab === `First`),
                    'text': `First`,
                    'name': `First`,
                    'onClick': ___context.clicked
                }
            }, [], ___view), ___wml.widget(Tab, {
                html: {},
                wml: {},
                ww: {
                    'active': (___context.tab === `Second`),
                    'text': `Second`,
                    'name': `Second`,
                    'onClick': ___context.clicked
                }
            }, [], ___view), ___wml.widget(Tab, {
                html: {},
                wml: {},
                ww: {
                    'active': (___context.tab === `Third`),
                    'text': `Third`,
                    'name': `Third`,
                    'onClick': ___context.clicked
                }
            }, [], ___view)], ___view), ___wml.node('p', {
                html: {},
                wml: {
                    'id': `content`
                }
            }, [___wml.domify(___context.content)], ___view)], ___view)], ___view)], ___view);

    }

}