import { Attrs } from '@quenk/wml';

/**
 * HTMLElementAttrs suggests a widget supports some of the basic
 * HTML element attributes.
 *
 * This may not be the case for all widgets whose attributes
 * use this interface.
 */
export interface HTMLElementAttrs {

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
 * WidgetAttrs describes the attribute namespace
 * for this library.
 */
export interface WidgetAttrs<A> extends Attrs {

    /**
     * ww is the namespace for widgets from this library.
     */
    ww?: A;

}

/**
 * getId from a widget's passed attributes.
 */
export const getId = (attrs: WidgetAttrs<HTMLElementAttrs>) =>
    (attrs.ww && attrs.ww.id) ? attrs.ww.id : '';

/**
 * getClassName from a widget's passed attributes.
 */
export const getClassName = (attrs: WidgetAttrs<HTMLElementAttrs>) =>
    (attrs.ww && attrs.ww.className) ? attrs.ww.className : '';

/**
 * textNode constructor.
 */
export const textNode = (str:string)=> document.createTextNode(str);
