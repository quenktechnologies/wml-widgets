import * as wml from '@quenk/wml';
import { ButtonMenu } from './ButtonMenu';
export declare type ButtonTemplate = () => (b: ButtonMenu) => (view: wml.View) => wml.Content;
