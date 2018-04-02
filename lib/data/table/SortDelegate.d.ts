import { HeadingClickedEvent } from './HeadingClickedEvent';
import { DefaultDelegate } from './DefaultDelegate';
export declare class SortDelegate<C, R> extends DefaultDelegate<C, R> {
    onHeadingClicked(e: HeadingClickedEvent): void;
}
