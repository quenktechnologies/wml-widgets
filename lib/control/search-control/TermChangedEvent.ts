import {Event} from '@package/wml-widgets/control';

/**
 * TermChangedEvent signals the search term has changed.
 */
export class TermChangedEvent extends Event<string>{

constructor(name:string ,value:string) { super(name, value); } 

}
