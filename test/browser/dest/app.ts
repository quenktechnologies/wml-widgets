import { View, Content } from '@quenk/wml';
import { reduce, group } from '@quenk/noni/lib/data/record';
import { DrawerLayout } from '../../../lib/layout/drawer';
import { LinkClickedEvent } from '../../../lib/content/link';
import { getById } from '../../../lib/util';
import { Main } from './wml/app';
import { pages } from './pages';

interface Pages {

    [section: string]: Modules

}

interface Modules {

    [name: string]: any

}

const pages2Pages = (): Pages => {

    let tmp = group(pages, (_, k) => k.split('_')[0]);

    for (let sec in tmp)
        if (tmp.hasOwnProperty(sec)) {

            let newSec: { [name: string]: any } = {};

            for (let name in tmp[sec])
                if (tmp[sec].hasOwnProperty(name)) {

                    newSec[name.split('_')[1]] = tmp[sec][name];

                }

            tmp[sec] = newSec;

        }

    return tmp;

}

const pages2Modules = () => {

    return reduce(pages, <Modules>{}, (p, c, k) => {

        p[k.split('_')[1]] = c;
        return p;

    })

}

/**
 * App displaying all the wml widgets.
 */
export class App {

    constructor(public root: HTMLElement) { }

    view: View = new Main(this);

    content: Content[] = [];

    page: string = '';

    pages: Pages = pages2Pages();

    modules: Modules = pages2Modules();

    values = {

        id: {

            layout: 'layout'

        }

    };

    /**
     * navigate is called when the user clicks on a 
     * navigation link.
     */
    navigate = ({ name }: LinkClickedEvent): void => {

        this.page = name;

        if (this.modules.hasOwnProperty(name)) {

            this.content = [this.modules[name].view.render()];
            this.view.invalidate();

        }

    }

    /**
     * toggleDrawer
     */
    toggleDrawer = (): void => {

        getById<DrawerLayout>(this.view, this.values.id.layout)
            .map((d: DrawerLayout) => d.toggle());

    }

    /**
     * run the application.
     */
    run(): void {

        let { root } = this;

        while (root.lastChild)
            root.removeChild(root.lastChild)

        root.appendChild(<Node>this.view.render());

        let path = window.location.hash.split('#')[1];
        path = path ? path.split('/').join('') : '';

    }

    static main(root: HTMLElement) {

        return new App(root);

    }

}

App.main(<HTMLElement>document.getElementById('app')).run();
