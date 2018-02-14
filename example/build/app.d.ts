import { View } from '@quenk/wml';
import { LinkClickedEvent } from '@package/wml-widgets/nav/link/LinkClickedEvent';
import { Maybe } from '@quenk/wml';
import { Drawer } from '@package/wml-widgets/layout/drawer/Drawer';
import { Navigation } from './wml/navigation';
import { Page } from './pages/Page';
export declare class App {
    /**
     * page currently displayed.
     */
    page: string;
    /**
     * pages to show the user.
     */
    pages: {
        [key: string]: Page;
    };
    /**
     * navigation view
     */
    navigation: Navigation;
    /**
     * values used within the template.
     */
    values: {
        id: {
            layout: string;
        };
    };
    /**
     * layout is the current application layout in use.
     */
    layout: Maybe<Drawer>;
    /**
     * view is the current application view.
     */
    view: View;
    /**
     * content displayed as the main content.
     */
    content: View;
    /**
     * toggleDrawer
     */
    toggleDrawer: () => void;
    /**
     * navigate is called when the user clicks on a
     * navigation link.
     */
    navigate: ({name}: LinkClickedEvent) => void;
    /**
     * route the main content based on the passed string.
     */
    route(name: string): void;
    /**
     * run the application.
     */
    run(): void;
    static main(): App;
}
