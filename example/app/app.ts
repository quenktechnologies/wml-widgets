import { reduce, merge } from 'afpl/lib/util';
import { View } from '@quenk/wml';
import { LinkClickedEvent } from '../../lib/nav/link/LinkClickedEvent';
import { Link } from '../../lib/nav/link/Link';
import { Maybe } from '@quenk/wml';
import { Drawer } from '../../lib/layout/drawer/Drawer';
import { Main } from './wml/app';
import { Navigation } from './wml/navigation';
import { Page } from './pages/Page';
//import { PanelPage } from './pages/panel';
//import { ListGroupPage } from './pages/list-group';
//import { TablePage } from './pages/table';
//import { TextFieldPage } from './pages/text-field';
//import { DatePage } from './pages/date';
//import { SelectPage } from './pages/select';
//import { ButtonPage } from './pages/button';
////import { ButtonSelectPage } from './pages/button-select';
//import { CheckboxPage } from './pages/checkbox';
//import { SwitchPage } from './pages/switch';
//import { TabsPage } from './pages/tabs';
//import { StackPage } from './pages/stack';
//import { SearchStackPage } from './pages/search-stack';
//import { AutocompletePage } from './pages/autocomplete';
//import { BreadCrumbsPage } from './pages/breadcrumbs';
//import { BusyIndicatorPage } from './pages/busy-indicator';
//import { MenuPage } from './pages/menu';
//import { ButtonGroupPage } from './pages/button-group';
//import { ButtonMenuPage } from './pages/button-menu';
//import { TabViewPage } from './pages/tab-view';

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
    links: { [key: string]: any } = {} /*{

        layout: {

            panel: new PanelPage(this),
            'list-group': new ListGroupPage(this),
            'tab-view': new TabViewPage(this)

        },
        table: {
            table: new TablePage(this)
        },
        control: {
            'text-field': new TextFieldPage(this),
            date: new DatePage(this),
            select: new SelectPage(this),
            autocomplete: new AutocompletePage(this),
            button: new ButtonPage(this),
            'button-group': new ButtonGroupPage(this),
         //   'button-select': new ButtonSelectPage(this),
            tabs: new TabsPage(this),
            stack: new StackPage(this),
            checkbox: new CheckboxPage(this),
            'switch': new SwitchPage(this),
            'search-stack': new SearchStackPage(this),
        },
        app: {
            'busy-indicator': new BusyIndicatorPage(this)
        },
        nav: {
            breadcrumbs: new BreadCrumbsPage(this),
        },
        menu: {
            menu: new MenuPage(this),
            'button-menu': new ButtonMenuPage(this)
        }

    };*/

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
    layout: Maybe<Drawer>;

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
            .map((d: Drawer) => d.toggleDrawer());

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

        this.layout = this.view.findById<Drawer>(this.values.id.layout);

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

