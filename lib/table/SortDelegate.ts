import { HeadingClickedEvent } from './HeadingClickedEvent';
import { DefaultDelegate } from './DefaultDelegate';

export class SortDelegate<C, R> extends DefaultDelegate<C, R> {

    onHeadingClicked(e: HeadingClickedEvent) {

        this.table.sort(e.field);

        super.onHeadingClicked(e);

    }

}

