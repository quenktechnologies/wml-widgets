import * as $wml from '@quenk/wml';
import { Stack } from '../Stack';
import { Member } from '../Member';
export declare const content: <M>(m: Member<M>) => (___context: Stack<M>) => (___view: $wml.View) => Node;
export declare class Main<M> extends $wml.AppView<Stack<M>> {
    constructor(context: Stack<M>);
}
