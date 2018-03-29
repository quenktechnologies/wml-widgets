import * as ___wml from '@quenk/wml';
import { ButtonMenu } from '../ButtonMenu';
export declare const button: (___context: ButtonMenu) => (___view: ___wml.View) => ___wml.Content;
export declare class Main extends ___wml.AppView<ButtonMenu> {
    constructor(___context: ButtonMenu);
}
