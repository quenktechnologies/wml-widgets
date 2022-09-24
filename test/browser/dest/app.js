"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const record_1 = require("@quenk/noni/lib/data/record");
const link_1 = require("../../../lib/content/link");
const util_1 = require("../../../lib/util");
const app_1 = require("./wml/app");
const pages_1 = require("./pages");
const pages2Pages = () => {
    let tmp = (0, record_1.group)(pages_1.pages, (_, k) => k.split('_')[0]);
    for (let sec in tmp)
        if (tmp.hasOwnProperty(sec)) {
            let newSec = {};
            for (let name in tmp[sec])
                if (tmp[sec].hasOwnProperty(name)) {
                    newSec[name.split('_')[1]] = tmp[sec][name];
                }
            tmp[sec] = newSec;
        }
    return tmp;
};
const pages2Modules = () => {
    return (0, record_1.reduce)(pages_1.pages, {}, (p, c, k) => {
        p[k.split('_')[1]] = c;
        return p;
    });
};
/**
 * App displaying all the wml widgets.
 */
class App {
    constructor(root) {
        this.root = root;
        this.view = new app_1.Main(this);
        this.content = [];
        this.page = '';
        this.pages = pages2Pages();
        this.modules = pages2Modules();
        this.values = {
            id: {
                layout: 'layout'
            }
        };
        /**
         * navigate is called when the user clicks on a
         * navigation link.
         */
        this.navigate = ({ name }) => {
            this.page = name;
            if (this.modules.hasOwnProperty(name)) {
                (0, util_1.getById)(this.view, this.values.id.layout)
                    .map((d) => d.setContent([this.modules[name].view.render()]));
            }
        };
        /**
         * toggleDrawer
         */
        this.toggleDrawer = () => {
            (0, util_1.getById)(this.view, this.values.id.layout)
                .map((d) => d.toggle());
        };
    }
    /**
     * run the application.
     */
    run() {
        let { root } = this;
        while (root.lastChild)
            root.removeChild(root.lastChild);
        root.appendChild(this.view.render());
        let path = window.location.hash.split('#')[1];
        path = path ? path.split('/').join('') : '';
        this.navigate(new link_1.LinkClickedEvent(path, path));
    }
    static main(root) {
        return new App(root);
    }
}
exports.App = App;
App.main(document.getElementById('app')).run();
//# sourceMappingURL=app.js.map