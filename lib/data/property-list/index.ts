import { View, Component } from '@quenk/wml';

import { get } from '@quenk/noni/lib/data/record/path';
import { Record } from '@quenk/noni/lib/data/record';

import { concat } from '../../util';
import { WidgetAttrs, HTMLElementAttrs, getClassName } from '../../';
import { NothingView, DataView, PropertyListView } from './wml/property-list';

///classNames:begin
export const PROPERTY_LIST = 'ww-property-list';
///classNames:end

/**
 * DataContext
 */
export interface DataContext<D, R extends Record<D>> {

    /**
     * name of the field.
     */
    name: string,

    /**
     * data item being displyed.
     */
    data: D,

    /**
     * format turns the data into a string.
     */
    format: (v: D) => string,

    /**
     * value is the value of all the data fields.
     */
    value: R

}

/**
 * Field describes a single field displayed in a PropertyList.
 */
export interface Field<D, R extends Record<D>> {

    /**
     * heading to display for the field.
     */
    heading: string,

    /**
     * name of the property to retrieve from the data item.
     */
    name: string,

    /**
     * format if specified will be applied to the value
     * before display.
     */
    format?: (v: D) => string,

    /**
     * dataFragment can be specified to customise the rendering
     * of the data value.
     */
    dataFragment?: (c: DataContext<D, R>) => View

}

/**
 * PropertyListAttrs 
 */
export interface PropertyListAttrs<D, R extends Record<D>>
    extends
    HTMLElementAttrs {

    /**
     * fields used to generate the data.
     */
    fields: Field<D, R>[],

    /**
     * data type  used to source properties from.
     */
    data: R

}

/**
 * DataCtx
 */
export class DataCtx<D, R extends Record<D>> implements DataContext<D, R> {

    constructor(
        public data: D,
        public name: string,
        public value: R,
        public format: (d: D) => string) { }

}

/**
 * PropertyList generates a description list using the properties of
 * an object.
 */
export class PropertyList<D, R extends Record<D>>
    extends
    Component<WidgetAttrs<PropertyListAttrs<D, R>>> {

    view: View = new PropertyListView(this);

    values = {

        root: {

            className: concat(PROPERTY_LIST, getClassName(this.attrs))

        },

        fields: <Field<D, R>[]>((this.attrs.ww && this.attrs.ww.fields) ?
            this.attrs.ww.fields : []),

        data: {

            value: <R>((this.attrs.ww && this.attrs.ww.data) ?
                this.attrs.ww.data : (<any>{})),

            get: (f: Field<D, R>) => {

                let mData = get(f.name, this.values.data.value);

                if (mData.isNothing())
                    return new NothingView({}).render();

                let d = mData.get();

                let fmt = (f.format) ? f.format : (c: D) => '' + c;

                let ctx = new DataCtx(d, f.name, this.values.data.value, fmt);

                if (f.dataFragment)
                    return f.dataFragment(ctx).render();
                else
                    return new DataView(ctx).render();

            }

        }

    }

    /**
     * setData to be displayed.
     */
    setData(data: R): PropertyList<D, R> {

        this.values.data.value = data;
        this.view.invalidate();
        return this;

    }

}
