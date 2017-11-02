import { Field } from './Table';
/**
 * HeadingClicked is triggered when the user clicks on
 * one of the column headings.
 */
export declare class HeadingClickedEvent<D> {
    name: string;
    field: Field<D>;
    constructor(name: string, field: Field<D>);
}
