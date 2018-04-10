import * as ___wml from '@quenk/wml';
import { TextField } from '../';
export { label, message } from '../../wml';
export declare const input: (___context: TextField) => (___view: ___wml.View) => Node;
export declare const textarea: (___context: TextField) => (___view: ___wml.View) => Node;
export declare const control: (___context: TextField) => (___view: ___wml.View) => Node;
export declare const group: (___context: TextField) => (___view: ___wml.View) => ___wml.Content;
export declare class Main extends ___wml.AppView<TextField> {
    constructor(___context: TextField);
}
