import { Attrs } from '@quenk/wml';

/**
 * HTMLId is a string value of the id property on an HTML element.
 */
export type HTMLId = string;

/**
 * WMLId is a string value of the wml:id property on a WML element.
 */
export type WMLId = string;

/**
 * HTMLElementAttrs suggests a widget supports some of the basic
 * HTML element attributes.
 *
 * This may not be the case for all widgets whose attributes
 * use this interface.
 */
export interface HTMLElementAttrs extends Attrs {

    /**
     * id usually applied to the root element of the widget's view.
     */
    id?: string,

    /**
     * className usually applied to the root element of
     * the widget's view.
     */
    className?: string

}

/**
 * getId from a widget's passed attributes.
 */
export const getId = (attrs: HTMLElementAttrs) =>
    attrs.id ? attrs.id : '';

/**
 * getClassName from a widget's passed attributes.
 *
 * Returns an empty string if the element has not className attribute.
 */
export const getClassName = (attrs: HTMLElementAttrs, ...names: string[]) =>
  [attrs.className, ...names].filter(name => name).join(' ');
