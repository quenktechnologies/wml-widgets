import * as $wml from '@quenk/wml';
import { ButtonMenu } from '../ButtonMenu';
export declare const button: () => (___context: ButtonMenu) => (___view: $wml.View) => Node;
export declare class Main extends $wml.AppView<ButtonMenu> {
    constructor(context: ButtonMenu);
}
