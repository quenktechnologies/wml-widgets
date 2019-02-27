import * as __wml from '@quenk/wml';
import { Message } from './message';
export declare const label: (id: string) => (text: string) => (__this: __wml.Registry) => __wml.Content[];
export declare const message: (_id: string) => (_m: Message) => (__this: __wml.Registry) => __wml.Content[];
