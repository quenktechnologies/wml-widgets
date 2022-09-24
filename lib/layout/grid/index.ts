import * as views from './wml/grid';
import { View } from '@quenk/wml';
import { concat } from '../../util';
import { LAYOUT, LayoutAttrs, AbstractLayout } from '../';

///classNames:begin
export const GRID_LAYOUT = 'ww-grid-layout';
export const GRID_LAYOUT_ROW = 'ww-grid-layout__row';
export const GRID_LAYOUT_COLUMN = 'ww-grid-layout__column';
///classNames:end

/**
 * GridAttrs
 */
export interface GridAttrs extends LayoutAttrs { }

/**
 * RowAttrs
 */
export interface RowAttrs extends LayoutAttrs { }

/**
 * ColumnAttrs
 */
export interface ColumnAttrs extends LayoutAttrs {

    /**
     * span indicates the length of the row a Column should span.
     */
    span?: number

    /**
     * offset the column location in the row by the provided number
     * of columns (max 12).
     */
    offset?: number

};

/**
 * GridLayout
 */
export class GridLayout extends AbstractLayout<GridAttrs> {

    view: View = new views.GridLayout(this);

    values = {

        content: {

            id: this.attrs && this.attrs.id,

            wml: {

                id: 'root',

            },
            className: () => {

                let c = (this.attrs && this.attrs.className) ?
                    <string>this.attrs.className : '';

                return concat(GRID_LAYOUT, LAYOUT, c);

            }
        }

    }

}

/**
 * Row
 */
export class Row extends AbstractLayout<RowAttrs> {

    view: View = new views.Row(this);

    values = {

        content: {

            id: this.attrs && this.attrs.id,

            wml: {

                id: 'row',

            },

            className: () => {

                let c = (this.attrs && this.attrs.className) ?
                    <string>this.attrs.className : '';

                return concat(GRID_LAYOUT_ROW, c);

            }

        }

    }

}

/**
 * Column
 */
export class Column extends AbstractLayout<ColumnAttrs> {

    view: View = new views.Column(this);

    values = {

        content: {

            id: this.attrs && this.attrs.id,

            wml: {

                id: 'column'

            },

            className: () => {

                if (this.attrs != null) {

                    return concat(GRID_LAYOUT_COLUMN,

                        this.attrs.span ?
                            `-span${this.attrs.span}` :
                            '-span12',

                        this.attrs.offset ?
                            `-offset${this.attrs.offset}` :
                            '',

                        <string>this.attrs.className);

                } else {

                    return concat(GRID_LAYOUT_COLUMN, '-span12');

                }

            }

        }

    }

}
