import {  FormControlWWAttrs  } from '@package/self/control';
import {Option} from './Option';

/**
 * SelectWWAttrs
 */
export interface SelectWWAttrs extends FormControlWWAttrs<string> {

    options?: Option[]

}
