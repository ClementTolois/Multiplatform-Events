export default class MultiplatformEvents {
	private _listeners: Map<string, Set<CallableFunction>>;

	constructor() {
		this._listeners = new Map();
	}

	public on(event: string, listener: CallableFunction): void {
		const listeners = this._getListeners(event);
		listeners.add(listener);
	}

	public once(event: string, listener: CallableFunction): void {
		const listeners = this._getListeners(event);
		const onceListener = (...args: unknown[]) => {
			listener(...args);
			this.off(event, onceListener);
		};
		listeners.add(onceListener);
	}

	public off(event: string, listener: CallableFunction): void {
		const listeners = this._getListeners(event);
		listeners.delete(listener);
	}

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