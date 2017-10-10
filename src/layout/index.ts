import {Attrs} from '@quenk/wml-runtime';
import { Group } from '../content';

/**
 * Layout is the parent class of all layout widgets.
 *
 * Typically a layout widget is used to display a set of
 * other widgets with little to no functionality on itself beyond
 * styling.
 */
export abstract class Layout<A extends Attrs> extends Group<A> { }
