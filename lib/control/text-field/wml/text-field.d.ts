import * as ___wml from '@quenk/wml';
import * as T from '../TextField';
export { label, message } from '@package/self/control/wml';
export declare const input: (___context: T.TextField) => (___view: ___wml.View) => Node;
export declare const textarea: (___context: T.TextField) => (___view: ___wml.View) => Node;
export declare const control: (___context: T.TextField) => (___view: ___wml.View) => Node;
export declare const group: (___context: T.TextField) => (___view: ___wml.View) => ___wml.Content;
export declare class Main extends ___wml.AppView<T.TextField> {
    constructor(___context: T.TextField);
}
