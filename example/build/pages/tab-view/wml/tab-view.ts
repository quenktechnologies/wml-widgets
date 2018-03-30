import * as ___wml from '@quenk/wml';
import {
    Grid,
    Row,
    Column
} from '../../../../../lib/layout/grid/Grid';;
import {
    TabView
} from '../../../../../lib/layout/tab-view';;
import {
    TabViewPage
} from '../';

export class FirstTab extends ___wml.AppView < TabViewPage > {

    constructor(___context: TabViewPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabViewPage > ) =>
            ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`Click a tab to change content.`)], ___view);

    }

};
export class SecondTab extends ___wml.AppView < TabViewPage > {

    constructor(___context: TabViewPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabViewPage > ) =>
            ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`Second tab.`)], ___view);

    }

};
export class ThirdTab extends ___wml.AppView < TabViewPage > {

    constructor(___context: TabViewPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabViewPage > ) =>
            ___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`Third tab.`)], ___view);

    }

}


export class Main extends ___wml.AppView < TabViewPage > {

    constructor(___context: TabViewPage) {

        super(___context);

        this.template = (___view: ___wml.AppView < TabViewPage > ) =>
            ___wml.widget(Grid, {
                html: {},
                wml: {}
            }, [___wml.widget(Row, {
                html: {},
                wml: {}
            }, [___wml.widget(Column, {
                html: {},
                wml: {}
            }, [___wml.widget(TabView, {
                html: {},
                wml: {},
                ww: {
                    'tabs': ___context.tabs
                }
            }, [___wml.node('p', {
                html: {},
                wml: {}
            }, [___wml.text(`Click a tab to change content.`)], ___view)], ___view)], ___view)], ___view)], ___view);

    }

}