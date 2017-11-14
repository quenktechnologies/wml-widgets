import { HeadingClickedEvent } from './HeadingClickedEvent';
import { DefaultDelegate } from './DefaultDelegate';
export declare class SortDelegate<D> extends DefaultDelegate<D> {
    onHeadingClicked(e: HeadingClickedEvent): void;
}
