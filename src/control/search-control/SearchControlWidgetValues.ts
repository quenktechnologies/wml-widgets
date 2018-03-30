import {FormControlWidgetValues} from '../../control/form-control';

/**
 * SearchControlWidgetValues describes the values available to all Search
 * templates.
 */
export interface SearchControlWidgetValues<V> extends FormControlWidgetValues {

    id: {

        root: string,
        input: string,
        menu: string,
        message: string

    },
    class: {

        input: string,
        root: string
    },

    /**
     * root element values
     */
    root: {

        id: string,
        class: string

    },
    help: {

      id:string

    },
    /**
     * input values for the input element used to receive search terms.
     */
    input: {

        id: string,

        placeholder: string,

        onKeyDown: (e: KeyboardEvent) => void,

        onKeyUp: (e: KeyboardEvent) => void,

        onInput: (e: KeyboardEvent) => void,
    },
    /**
     * search is values for search related functionality.
     */
    search: {

        delay: number,

        results: V[]

    },
    /**
     * item is values used in rendering each result
     */
    item: {

        stringify: (v: V) => string,

        click: (index: number | string) => void

    }

}

