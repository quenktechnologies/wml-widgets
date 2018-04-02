import * as wml from '@quenk/wml';
import { App } from '../app';
import { View } from '@quenk/wml';
export declare class Page {
    app: App;
    view: View;
    constructor(app: App);
    get(id: string, fn: (w: wml.WMLElement) => void): void;
}
