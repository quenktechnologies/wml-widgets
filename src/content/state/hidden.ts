import { View } from '@quenk/wml';
import { Maybe } from '@quenk/noni/lib/data/maybe';
import { warnMissing } from '../../util';

///classNames:begin
/**
 * HIDDEN means an element should not be visible but not removed
 * from the DOM.
 */
export const HIDDEN = '-ww-hidden';
///classNames:end

/**
 * Hidable is widget that has a Hidden mode.
 *
 * This is usually implemented by styling around the occurance of the 
 * HIDDEN class name.
 */
export interface Hidable {

    /**
     * isHidden indicates the DOM for the widget is hidden.
     */
    isHidden(): boolean;

    /**
     * hide the DOM of the widget.
     */
    hide(): Hidable;

    /**
     * show the DOM of the widget.
     */
    show(): Hidable;

    /**
     * toggle between show and hide states
     */
    toggle(): Hidable;

}

/**
 * isHidden helper.
 *
 * Retrieves an HTMLElement by id and checks whether
 * it has the hidden class attached.
 */
export const isHidden = (view: View, id: string): boolean => {

    let m: Maybe<HTMLElement> = view.findById(id);

    if (m.isNothing()) {

        warnMissing(view, id);
        return true;

    } else {

        return m.get().classList.contains(HIDDEN);

    }

}

/**
 * hide helper.
 *
 * Attempts to add HIDDEN to the target elements class name.
 */
export const hide = (view: View, id: string) => {

    let m: Maybe<HTMLElement> = view.findById(id);

    if (m.isNothing()) {

        return warnMissing(view, id);

    } else {

        let e = m.get();

        e.classList.remove(HIDDEN);
        e.classList.add(HIDDEN);

    }

}

/**
 * show helper.
 * 
 * Attempts to remove the HIDDEN class name from the target element.
 */
export const show = (view: View, id: string) => {

    let m: Maybe<HTMLElement> = view.findById(id);

    if (m.isNothing()) {

        return warnMissing(view, id);

    } else {

        m.get().classList.remove(HIDDEN);

    }

}

/**
 * toggle helper.
 *
 * Attempts to toggle the HIDDEN class name from the target element
 * classList.
 */
export const toggle = (view: View, id: string) => {

    let m: Maybe<HTMLElement> = view.findById(id);

    if (m.isNothing()) {

        return warnMissing(view, id);

    } else {

        m.get().classList.toggle(HIDDEN);

    }

}
