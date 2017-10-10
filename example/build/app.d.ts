import { Maybe } from '@quenk/wml-runtime';
import { Drawer } from '@package/self/layout/drawer/Drawer';
import { Main } from './wml/app';
export declare class App {
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
    view: Main;
    /**
     * run the application.
     */
    run(): void;
    static main(): App;
}
