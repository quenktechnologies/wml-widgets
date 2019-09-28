import { View, Content } from '@quenk/wml';
import { Record } from '@quenk/noni/lib/data/record';
import { Column } from './column';

/**
 * HeadFragment type.
 */
export type HeadFragment<C, R extends Record<C>>
    = (c: HeadContext<C, R>) => View
    ;

/**
 * HeadingFragment type.
 */
export type HeadingFragment<C, R extends Record<C>>
    = (c: HeadingContext<C, R>) => View
    ;

/**
 * HeadContext
 */
export interface HeadContext<C, R extends Record<C>> {

    /**
     * className for the <thead>
     */
    className: string,

    /**
     * columns used to generate the headings.
     */
    columns: Column<C, R>[],

    /**
     * data provides the current data used by the table.
     */
    data: R[],

    /**
     * heading generates a heading cell from a column spec.
     */
    heading: (c: Column<C, R>, n: number) => Content

}

/**
 * HeadingContext
 */
export interface HeadingContext<C, R extends Record<C>> {

    /**
     * className provider.
     */
    className: string,

    /**
     * column used to generate the heading.
     */
    column: Column<C, R>,

    /**
     * headContext that generated this HeadingContext.
     */
    headContext: HeadContext<C, R>,

    /**
     * onclick handler
     */
    onclick: (e: Event) => void

}
