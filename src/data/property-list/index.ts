import { Fun, Component } from '@quenk/wml';
import { get } from '@quenk/noni/lib/data/record/path';
import { Record } from '@quenk/noni/lib/data/record';
import { concat } from '../../util';
import { WidgetAttrs, HTMLElementAttrs, getClassName, text } from '../../';
import { Main } from './wml/property-list';

///classNames:begin
export const PROPERTY_LIST = 'ww-property-list';
///classNames:end

/**
 * Field describes a single field displayed in a PropertyList.
 */
export interface Field<D, R> {

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
    dataFragment?: (value: D, key: string, data: R) => Fun

}

/**
 * PropertyListAttrs 
 */
export interface PropertyListAttrs<D, R> extends HTMLElementAttrs {

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
 * PropertyList generates a description list using the properties of
 * an object.
 */
export class PropertyList<D, R extends Record<D>>
    extends
    Component<WidgetAttrs<PropertyListAttrs<D, R>>> {

    view: Main<D, R> = new Main(this);

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
                    return [text('')];

                let d = mData.get();

                if (f.dataFragment)
                    return f.dataFragment(d, f.name,
                        this.values.data.value)(this.view);

                if (f.format)
                    return [text('' + f.format(d))];

                return [text('' + d)];

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
