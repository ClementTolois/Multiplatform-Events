# Multiplatform Events

## Overview

A really (really) simple event system for every JS project. As in nodejs you can extends the *MultiplatformEvents* class to create your own event system. Then you will be able to use the *on* *once* *off* and *emit* methods to manage your events.

## Installation

```bash
npm install multiplatform-events
```

## Usage

### Example 1
```js
import MultiplatformEvents from 'multiplatform-events';
// or
const MultiplatformEvents = require('multiplatform-events');

const events = new MultiplatformEvents();
events.on('myEvent', (data) => {
	console.log(data);
});
events.emit('myEvent', 'Hello World !');
// Hello World !
```

### Example 2
```js
import MultiplatformEvents from 'multiplatform-events';
// or
const MultiplatformEvents = require('multiplatform-events');

class MyEvents extends MultiplatformEvents {
	constructor() {
		super();
	}

	myMethod() {
		this.emit('myEvent', 'Hello World !');
	}
}

const events = new MyEvents();
events.on('myEvent', (data) => {
	console.log(data);
});
events.myMethod();
// Hello World !
```

