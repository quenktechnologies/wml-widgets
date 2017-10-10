import { Maybe } from '@quenk/wml-runtime';
import { Drawer } from '@package/self/layout/drawer/Drawer';
import { Main } from './wml/app';

export class App {

    /**
     * values used within the template.
     */
    values = {

        id: {

            layout: 'layout'

        }

    }

    /**
     * layout is the current application layout in use.
     */
    layout: Maybe<Drawer>;

    /**
     * view is the current application view.
     */
    view = new Main(this);

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

