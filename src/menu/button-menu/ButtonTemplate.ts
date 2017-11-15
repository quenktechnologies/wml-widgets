import * as wml from '@quenk/wml';
import {ButtonMenu} from './ButtonMenu';

export type ButtonTemplate = (b:ButtonMenu) => (view:wml.View)=> wml.Content;
