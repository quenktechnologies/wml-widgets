import * as $wml from '@quenk/wml';
import { Message } from './Message';
export declare const label: (id: string, text: string) => (___view: $wml.View) => Node;
export declare const message: (id: string, m: Message) => (___view: $wml.View) => Node;
