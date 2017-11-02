import * as wml from '@quenk/wml';
import { Member } from './Member';
import { Stack } from './Stack';
export declare type Template<M> = (m: Member<M>, i: number | string, l: Member<M>[]) => (s: Stack<M>) => (view: wml.View) => wml.Content;
