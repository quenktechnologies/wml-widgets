import { View } from '@quenk/wml';
import { LinkClickedEvent } from '@package/self/nav/link/LinkClickedEvent';
import { Link } from '@package/self/nav/link/Link';
import { Maybe } from '@quenk/wml';
import { Drawer } from '@package/self/layout/drawer/Drawer';
import { Main } from './wml/app';
import { Navigation } from './wml/navigation';
import { Page } from './pages/Page';
import { HomePage } from './pages/home';
import { PanelPage } from './pages/panel';
import { ListGroupPage } from './pages/list-group';
import { TablePage } from './pages/table';
import { TextFieldPage } from './pages/text-field';
import { DatePage } from './pages/date';
import { SelectPage } from './pages/select';
import { ButtonSelectPage } from './pages/button-select';
import { CheckboxPage } from './pages/checkbox';
import { SwitchPage } from './pages/switch';
import { TabsPage } from './pages/tabs';
import { StackPage } from './pages/stack';
import { SearchStackPage } from './pages/search-stack';
import { AutocompletePage } from './pages/autocomplete';
import { BreadCrumbsPage } from './pages/breadcrumbs';
import { BusyIndicatorPage } from './pages/busy-indicator';
import { MenuPage } from './pages/menu';
import { ButtonMenuPage } from './pages/button-menu';

export class App {

    /**
     * page currently displayed.
     */
    page: string = 'home';

    /**
     * pages to show the user.
     */
    pages: { [key: string]: Page } = {

        home: new HomePage(this),
        panel: new PanelPage(this),
        'list-group': new ListGroupPage(this),
        table: new TablePage(this),
        'text-field': new TextFieldPage(this),
        date: new DatePage(this),
        select: new SelectPage(this),
        autocomplete: new AutocompletePage(this),
        'button-select': new ButtonSelectPage(this),
        tabs: new TabsPage(this),
        stack: new StackPage(this),
        checkbox: new CheckboxPage(this),
        'switch': new SwitchPage(this),
        'busy-indicator': new BusyIndicatorPage(this),
        'search-stack': new SearchStackPage(this),
        breadcrumbs: new BreadCrumbsPage(this),
        menu: new MenuPage(this),
        'button-menu': new ButtonMenuPage(this)

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
    layout: Maybe<Drawer>;

    /**
     * view is the current application view.
     */
    view: View = new Main(this);

    /**
     * content displayed as the main content.
     */
    content: View = this.pages.home.view;

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

        console.info('name-> ', name);
        console.info(this.pages.hasOwnProperty(name));

        this.page = name;

        if (this.pages.hasOwnProperty(name))
            this.content = this.pages[name].view;

        this.view.invalidate();
        this.navigation.invalidate();

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

