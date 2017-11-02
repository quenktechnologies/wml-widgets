import * as views from './wml/views';
import { Component, Attrs } from '@quenk/wml';
export declare class Fragment extends Component<Attrs> {
    view: views.Main;
    render(): DocumentFragment;
}
