/**
 * Event is the parent class of all events generated by controls.
 */
export declare class Event<A> {
    name: string;
    value: A;
    constructor(name: string, value: A);
}
