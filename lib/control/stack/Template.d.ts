import * as wml from '@quenk/wml';
import { Member } from './Member';
import { Stack } from './Stack';
export declare type Template<M> = (s: Stack<M>) => (m: Member<M>) => (i: number) => (l: Member<M>[]) => (view: wml.View) => wml.Content;
