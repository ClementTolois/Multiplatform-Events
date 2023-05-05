
import MultiplatformEvents from '@/core/MultiplatformEvents';

describe('Test MultiplatformEvents class', () => {
	it('Should be able to subscribe an event', () => {
		const mevents = new MultiplatformEvents();
		const callback = jest.fn();
		mevents.on('test', callback);
		mevents.emit('test');
		expect(callback).toHaveBeenCalled();
	});

	it('Should be able to unsubscribe an event', () => {
		const mevents = new MultiplatformEvents();
		const callback = jest.fn();
		mevents.on('test', callback);
		mevents.off('test', callback);
		mevents.emit('test');
		expect(callback).not.toHaveBeenCalled();
	});

	it('Should be able to subscribe an event once', () => {
		const mevents = new MultiplatformEvents();
		const callback = jest.fn();
		mevents.once('test', callback);
		mevents.emit('test');
		mevents.emit('test');
		expect(callback).toHaveBeenCalledTimes(1);
	});

	it('Should be able to subscribe multiple events', () => {
		const mevents = new MultiplatformEvents();
		const callback = jest.fn();
		mevents.on('test1', callback);
		mevents.on('test2', callback);
		mevents.emit('test1');
		mevents.emit('test2');
		expect(callback).toHaveBeenCalledTimes(2);
	});

	it('Should be able to subscribe multiple events once', () => {
		const mevents = new MultiplatformEvents();
		const callback = jest.fn();
		mevents.once('test1', callback);
		mevents.once('test2', callback);
		mevents.emit('test1');
		mevents.emit('test2');
		mevents.emit('test1');
		mevents.emit('test2');
		expect(callback).toHaveBeenCalledTimes(2);
	});
});