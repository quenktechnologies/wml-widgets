import {Event} from '@package/wml-widgets/control';

/**
 * TabClickedEvent is fired when a user clicks on a tab.
 *
 * It contains information about the tab that was clicked.
 */
export class TabClickedEvent extends Event<string> {

    constructor(public name: string) {  super(name,name);}

}
