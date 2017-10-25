import * as landing from './wml/landing';
import * as views from './wml/views';
import { View } from '@quenk/wml';
import { LinkClickedEvent } from '@package/self/nav/link/LinkClickedEvent';
import { Link } from '@package/self/nav/link/Link';
import { Maybe } from '@quenk/wml-runtime';
import { Drawer } from '@package/self/layout/drawer/Drawer';
import { Main } from './wml/app';
import { Navigation } from "./wml/navigation"

export class App {

    /**
     * page currently displayed.
     */
    page: string = '';

    /**
     * views to show the user.
     */
    views: { [key: string]: View } = {

        panels: new views.PanelScreen(this)

    };

    /**
     * navigation view
     */
    navigation = new Navigation(this);

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

    content: View = new landing.Main(this);

    /**
     * toggleDrawer
     */
    toggleDrawer = (): void => {

        this
            .view
            .findById(this.values.id.layout)
            .map((d: Drawer) => d.toggleDrawer());

    }

    navigate = ({ name }: LinkClickedEvent): void => {

        this.page = name;

        if (this.views.hasOwnProperty(name))
            this.content = this.views[name];

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

    }

    static main() {

        return new App();

    }

}

let w: any = window;

w.app = App.main();
w.app.run();

