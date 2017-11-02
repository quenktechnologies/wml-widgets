import * as wml from '@quenk/wml';
import { Page } from '../Page';
export declare class ButtonMenuPage extends Page {
    view: wml.View;
    onClick: (msg: string) => (e: Event) => void;
}
