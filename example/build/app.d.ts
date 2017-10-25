import { View } from '@quenk/wml';
import { LinkClickedEvent } from '@package/self/nav/link/LinkClickedEvent';
import { Maybe } from '@quenk/wml-runtime';
import { Drawer } from '@package/self/layout/drawer/Drawer';
import { Navigation } from "./wml/navigation";
export declare class App {
    /**
     * page currently displayed.
     */
    page: string;
    /**
     * views to show the user.
     */
    views: {
        [key: string]: View;
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
    content: View;
    /**
     * toggleDrawer
     */
    toggleDrawer: () => void;
    navigate: ({name}: LinkClickedEvent) => void;
    /**
     * run the application.
     */
    run(): void;
    static main(): App;
}
