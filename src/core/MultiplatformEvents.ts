export default class MultiplatformEvents {
	private _listeners: Map<string, Set<CallableFunction>>;

	constructor() {
		this._listeners = new Map();
	}
	
	/**
	 * Listen to an event
	 * @param event - The event to listen to
	 * @param listener  - The function to call each time the event is emitted
	 */
	public on(event: string, listener: CallableFunction): void {
		const listeners = this._getListeners(event);
		listeners.add(listener);
	}

	/**
	 * 
	 * @param event - The event to listen to
	 * @param listener - The function to call once time when the event is emitted
	 */
	public once(event: string, listener: CallableFunction): void {
		const listeners = this._getListeners(event);
		const onceListener = (...args: unknown[]) => {
			listener(...args);
			this.off(event, onceListener);
		};
		listeners.add(onceListener);
	}

	/**
	 * Stop listening to an event
	 * @param event - The event to stop listening to
	 * @param listener  - The function to stop calling when the event is emitted
	 */
	public off(event: string, listener: CallableFunction): void {
		const listeners = this._getListeners(event);
		listeners.delete(listener);
	}

	/**
	 * Emit an event
	 * @param event - The event to emit
	 * @param args - The arguments to pass to the listeners
	 */
	public emit(event: string, ...args: unknown[]): void {
		const listeners = this._getListeners(event);
		listeners.forEach(listener => listener(...args));
	}

	private _getListeners(event: string): Set<CallableFunction> {
		let listeners = this._listeners.get(event);
		if (listeners) return listeners;
		listeners = new Set();
		this._listeners.set(event, listeners);
		return listeners;
	}
}