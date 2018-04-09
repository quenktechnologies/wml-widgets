import { reduce, merge } from 'afpl/lib/util';
import { View } from '@quenk/wml';
import { Link, LinkClickedEvent } from '../../lib/content/nav/link';
import { Maybe } from '@quenk/wml';
import { DrawerLayout } from '../../lib/layout/drawer-layout';
import { Main } from './wml/app';
import { Navigation } from './wml/navigation';
import { Page } from './pages/Page';
import { PanelPage } from './pages/panel';
import { ListLayoutPage } from './pages/list-layout';
import { TablePage } from './pages/table';
import { TextFieldPage } from './pages/text-field';
//import { DatePage } from './pages/date';
//import { SelectPage } from './pages/select';
import { ButtonPage } from './pages/button';
import { ToolbarPage } from './pages/toolbar';
import { ButtonSelectPage } from './pages/button-select';
import { CheckboxPage } from './pages/checkbox';
import { SwitchPage } from './pages/switch';
import { TabBarPage } from './pages/tab-bar';
import { StackPage } from './pages/stack';
//import { SearchStackPage } from './pages/search-stack';
//import { AutocompletePage } from './pages/autocomplete';
import { BreadcrumbPage } from './pages/breadcrumb';
import { ActivityIndicatorPage } from './pages/activity-indicator';
import { MenuPage } from './pages/menu';
import { ButtonGroupPage } from './pages/button-group';
import { DropDownPage } from './pages/drop-down';
import { TabLayoutPage } from './pages/tab-layout';
import { HorizontalLayoutPage } from './pages/horizontal-layout';
import { NavPage } from './pages/nav';

const displayName = (s: string) =>
    [s[0].toUpperCase()]
        .concat(s
            .split(s[0])
            .slice(1)
            .join(s[0]))
        .join('')
        .replace(/(\-|_|\s)+(.)?/g, (_, __, c) => (c ? c.toUpperCase() : ''));

const flatten = (links: { [key: string]: { [key: string]: Page } }) =>
    reduce(links, (flatLinks: { [key: string]: Page }, current) =>
        reduce(current, (p, c, k) => <any>merge(p, { [k]: c }), flatLinks), {});

export class App {

    /**
     * page currently displayed.
     */
    page: string = '';

    /**
     * pages to show the user.
     */
    get pages(): { [key: string]: Page } { return flatten(this.links); }

    /**
     * links to the pages.
     */
    links: { [key: string]: any } = {

        layout: {

            panel: new PanelPage(this),
            'list-layout': new ListLayoutPage(this),
            'tab-layout': new TabLayoutPage(this),
            'horizontal-layout': new HorizontalLayoutPage(this)

        },
        data: {
            table: new TablePage(this)
        },
        control: {
            'text-field': new TextFieldPage(this),
            //      date: new DatePage(this),
            //      select: new SelectPage(this),
            //      autocomplete: new AutocompletePage(this),
            button: new ButtonPage(this),
            'button-group': new ButtonGroupPage(this),
            'toolbar': new ToolbarPage(this),
            'button-select': new ButtonSelectPage(this),
            'tab-bar': new TabBarPage(this),
            menu: new MenuPage(this),
            'drop-down': new DropDownPage(this),
                  stack: new StackPage(this),
            checkbox: new CheckboxPage(this),
                  'switch': new SwitchPage(this),
            //      'search-stack': new SearchStackPage(this),
        },
        content: {

            nav: new NavPage(this),
            breadcrumb: new BreadcrumbPage(this),

        },
        app: {
            'activity-indicator': new ActivityIndicatorPage(this)
        }

    };

    /**
     * navigation view
     */
    navigation: Navigation = new Navigation(this);

    /**
     * values used within the template.
     */
    values = {

        id: {

            layout: 'layout'

        }

    };

    /**
     * layout is the current application layout in use.
     */
    layout: Maybe<DrawerLayout>;

    /**
     * view is the current application view.
     */
    view: View = new Main(this);

    /**
     * content displayed as the main content.
     */
    content: View;

    /**
     * displayName provides the display name for a the links.
     */
    displayName = displayName;

    /**
     * sort an object.
     */
    sort = (o: any) =>
        Object.keys(o).sort().reduce((p: any, k) => { p[k] = o[k]; return p; }, {});

    /**
     * toggleDrawer
     */
    toggleDrawer = (): void => {

        this
            .view
            .findById(this.values.id.layout)
            .map((d: DrawerLayout) => d.toggle());

    }

    /**
     * navigate is called when the user clicks on a 
     * navigation link.
     */
    navigate = ({ name }: LinkClickedEvent): void => this.route(name);

    /**
     * route the main content based on the passed string.
     */
    route(name: string): void {

        this.page = name;

        if (this.pages.hasOwnProperty(name)) {
            this.content = this.pages[name].view;

            this.view.invalidate();
            this.navigation.invalidate();

        }

    }

    /**
     * run the application.
     */
    run(): void {

        let root = document.getElementById('app');

        while (root.lastChild)
            root.removeChild(root.lastChild)

        root.appendChild(this.view.render());

        this.layout = this.view.findById<DrawerLayout>(this.values.id.layout);

        let path = window.location.hash.split('#')[1];
        path = path ? path.split('/').join('') : '';
        this.route(path);

    }

    static main() {

        return new App();

    }

}

let w: any = window;

w.app = App.main();
w.app.run();

