import { FormControlWWAttrs } from '@package/self/control/form-control';
import { Member } from './Member';
import { Template } from './Template';

/**
 * StackWWAttrs
 */
export interface StackWWAttrs<M> extends FormControlWWAttrs<Member<M>[]> {

    /**
     * template for rendering each member of the stack.
     */
    template?: Template<M>,

    /**
     * decorator is a function that turns a member into a string.
     */
    decorator?: (m: Member<M>) => string

}
