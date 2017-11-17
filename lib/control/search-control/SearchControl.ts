
/** 
 * SearchControl
 */
export interface SearchControl<V> {

    /**
     * update the Search with new results.
     */
    update(results: V[]): SearchControl<V>;

    /**
     * open the search result dialog.
     */
    open(): SearchControl<V>;

    /**
     * close the search result dialog.
     */
    close(): SearchControl<V>;

}
