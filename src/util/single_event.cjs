
/**
 * @template {(...args:any[])=>void} ListenerType
 */
class SingleEvent {
    /**
     * @type {ListenerType[]}
     */
    _listeners
    /**
     * @type {ListenerType[]}
     */

    _onceListeners

    constructor() {
        this._listeners = []
        this._onceListeners = []

    }
    /**
     * 
     * @param {ListenerType} listener 
     */
    on(listener) {
        this._listeners.push(listener)
    }
    /**
     * 
     * @param {ListenerType} listener 
     */
    once(listener) {
        this._onceListeners.push(listener)
    }
    /**
     * 
     * @param  {Parameters<ListenerType>} args 
     */
    emit(...args) {
        for (const listener of this._listeners) {
            listener(...args)
        }
        for (const listener of this._onceListeners) {
            listener(...args)
        }
        this._onceListeners = []

    }
    off(listener) {
        const index = this._listeners.indexOf(listener)
        if (index >= 0) {
            this._listeners.splice(index, 1)
        }

    }
    offOnce(listener) {
        const index = this._onceListeners.indexOf(listener)
        if (index >= 0) {
            this._onceListeners.splice(index, 1)
        }


    }

}

module.exports = { SingleEvent }