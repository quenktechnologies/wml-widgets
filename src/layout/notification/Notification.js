import { View, Widget } from 'wmljs/lib/runtime';
import * as Class from 'wat-classes';
import notification from './wml/notification.wml';

/**
 * Notification
 */
class Notification extends Widget {

    constructor(attrs, children) {

        super(attrs, children);

        this.view = new View(notification, this);

    }

    /**
     * put a message into the notification widget.
     * Messages are shown for a specific time before
     * they are hidden.
     */
    put(message) {

        var node = this.view.findById('message');

        node.classList.remove(Class.VISIBLE);

        while (node.lastChild)
            node.removeChild(node.lastChild);

        node.appendChild(document.createTextNode(message));

        node.classList.add(Class.VISIBLE);

        setTimeout(function() {

            node.classList.remove(Class.VISIBLE);

        }, this.attributes.read('wat:delay', 3) * 1000);

    }

    render() {

        return this.view.render();

    }

}
export default Notification
