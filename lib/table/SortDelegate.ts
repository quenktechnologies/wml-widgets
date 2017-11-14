import { HeadingClickedEvent } from './HeadingClickedEvent';
import { DefaultDelegate } from './DefaultDelegate';

export class SortDelegate<D> extends DefaultDelegate<D> {

    onHeadingClicked(e: HeadingClickedEvent) { 
      
      this.table.sort(e.field); 

      super.onHeadingClicked(e);
    
    }

}

