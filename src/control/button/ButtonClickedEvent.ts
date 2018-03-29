import {Event} from '../Event';

/**
 * ButtonClickedEvent
 */
export class ButtonClickedEvent extends Event<void> {

  constructor(public name:string) { super(name,null); }

}
