import * as ___wml from '@quenk/wml';
import { Stack } from '../Stack';
import { Member } from '../Member';
export declare const content: <M>(m: Member<M>) => (___context: Stack<M>) => (___view: ___wml.View) => Node;
export declare class Main<M> extends ___wml.AppView<Stack<M>> {
    constructor(context: Stack<M>);
}
