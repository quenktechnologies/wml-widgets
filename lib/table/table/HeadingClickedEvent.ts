import { Field } from './Table';

/**
 * HeadingClicked is triggered when the user clicks on 
 * one of the column headings.
 */ 
export class HeadingClickedEvent<D> {

    constructor(
        public name: string,
        public field: Field<D>) { }

}

