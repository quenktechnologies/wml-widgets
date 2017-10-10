import {
    empty as $$empty,
    box as $$box,
    text as $$text,
    node as $$node,
    read as $$read,
    widget as $$widget,
    ifE as $$if,
    forE as $$for,
    switchE as $$switch,
    domify as $$domify,
    AppView
} from "@quenk/wml-runtime";

import {
    Drawer
} from "@package/self/layout/drawer/Drawer";
import {
    ActionBar
} from "@package/self/app/action-bar/ActionBar";
import {
    App
} from "../app";
import {
    MenuButton
} from "@package/self/app/menu-button/MenuButton";


export class Main extends AppView < App > {

    constructor(context: App) {

        super(context);

        let view = this;

        this.template = function($$view: AppView < App > , $$ctx: App) {
            return $$widget(Drawer, {
                html: {},
                wml: {
                    'id': $$ctx.values.id.layout
                }
            }, [$$widget(ActionBar, {
                html: {},
                wml: {}
            }, [$$widget(MenuButton, {
                html: {},
                wml: {},
                ww: {
                    'onClick': function function_literal_1() {
                        return $$ctx.view.findById < Drawer > ($$ctx.values.id.layout).map(function function_literal_2(d) {
                            return d.toggleDrawer();
                        });
                    }
                }
            }, [], $$view)], $$view)], $$view)
        }

    }

}