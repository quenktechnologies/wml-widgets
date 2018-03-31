import {Event} from '../';

/**
 * ButtonClickedEvent
 */
export class ButtonClickedEvent extends Event<void> {

  constructor(public name:string) { super(name,null); }

}
