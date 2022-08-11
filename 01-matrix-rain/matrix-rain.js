/**
 * Function for matrix rain effect.
 * 
 * Steps to use:
 * 1) Add the configurations, specify various property for the rain
 * 2) Call the instance of Matrix function
 * 
 * Author: Sahil David <sahildavid.dev@gmail.com>
 */

const MATRIX_SYMBOLS = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';

const MATRIX_DEFAULTS = {
	selector: 'body',
	backgroundColor: '#010101',
	symbolColor: '#0aff0a',
	fontSize: 14,
	frameRate: 30,
	fadeFactor: 0.05,
	setInterval: false, // expects number as interval time - NOT RECOMMENDED
	gradient: false, // expects gradient object instead { type: 'linear', position: { x, y, width, height }, stopColors: [] }
	randomHeights: false, // expects array instead
	highlightTail: false // expects highlight object instead { color, threshold }
};

const MATRIX_HELPERS = {
	convertHexToRGB (hex) {
		if (!(hex && hex.length <= 7)) {
			throw '[ERR]: No hex code supplied for rgb conversion';
		}
		return {
			r: parseInt(hex[1] + hex[2], 16),
			g: parseInt(hex[3] + hex[4], 16),
			b: parseInt(hex[5] + hex[6], 16)
		}
	},
	randomNumber (range = [0, 1]) {
		let min = 0;
		let max;
		if (Array.isArray(range)) {
			[min, max] = range;
		} else {
			max = range
		}

		return Math.random() * (max - min) + min;
	}
}

/**
 * Matrix Class
 */
class Matrix {
	constructor (params = {}) {
		params = Object.assign({}, MATRIX_DEFAULTS, params);
		this.MATRIX_SYMBOLS = params.matrix_symbols || MATRIX_SYMBOLS;
		this.RANDOM_FACTOR = 0.95;

		this.selector = params.selector;
		this.backgroundColor = params.backgroundColor;
		this.symbolColor = params.symbolColor;
		this.width = params.width;
		this.height = params.height;
		this.fontSize = params.fontSize;

		this.ctx = this.#intialiseCanvas();
		this.columns = Math.ceil(this.width / this.fontSize);
		this.symbols = this.#initialiseSymbols();

		this.frameRate = params.frameRate;
		this.nextFrame = 1000 / this.frameRate;
		this.lastTime = 0;
		this.timer = 0;

		this.fadeFactor = params.fadeFactor;
		this.fadeRandom = params.fadeRandom;
		this.randomHeights = params.randomHeights;

		this.gradient = params.gradient;
		this.highlightTail = params.highlightTail;

		this.setInterval = params.setInterval;
	}

	#intialiseCanvas () {
		const _element = document.querySelector(this.selector);
		if (!_element) {
			throw `[ERR]: No DOM element found for selector '${this.selector}'`;
		}
		
		// Add Canvas Element
		const canvas = document.createElement('canvas');
		canvas.classList.add('sd-matrix-canvas')
		_element.appendChild(canvas)
		
		// Canvas Style
		canvas.style.backgroundColor = this.backgroundColor;
		this.#canvasSize();

		return canvas.getContext('2d');
	}

	#canvasSize () {
		const _element = document.querySelector(this.selector);
		if (!_element) {
			throw `[ERR]: No DOM element found for selector '${this.selector}'`;
		}
		
		const _canvas = document.querySelector(`${this.selector} canvas`);
		if (!_canvas) {
			throw `[ERR]: No canvas found for selector '${this.selector} canvas'`;
		}

		_canvas.width = _element.clientWidth || window.innerWidth;
		_canvas.height = _element.clientHeight || window.innerHeight;
		this.width = _canvas.width;
		this.height = _canvas.height;
	}

	#initialiseSymbols () {
		const _symbols = [];
		for (let i = 0; i < this.columns; i++) {
			let y = 0;
			_symbols.push(() => {
				const x = i;
				const char = this.MATRIX_SYMBOLS.charAt(Math.floor(Math.random() * this.MATRIX_SYMBOLS.length));

				const _height = this.randomHeights ? MATRIX_HELPERS.randomNumber(this.randomHeights) * this.height : this.height;

				let _canvasFill = this.gradient ? this.#canvasGradient() : this.symbolColor;
				if (this.highlightTail && y * this.fontSize > _height * this.highlightTail.threshold && Math.round(Math.random()) === 0) {
					_canvasFill = this.highlightTail.color;
				}

				this.ctx.fillStyle = _canvasFill;
				this.ctx.fillText(char, x * this.fontSize, y * this.fontSize);

				if (y * this.fontSize > _height && Math.random() > this.RANDOM_FACTOR) {
					y = 0;
				} else {
					y += 1;
				}
			})
		}

		return _symbols;
	}

	#canvasGradient () {
		const { position, stopColors } = this.gradient;

		const _width = position.width === '{{__CANVAS_WIDTH}}' ? this.width : position.width;
		const _height = position.height === '{{__CANVAS_HEIGHT}}' ? this.height : position.height;
		let _gradient = this.ctx.createLinearGradient(position.x, position.y, _width, _height);

		stopColors.forEach((_) => {
			console.log(_);
			_gradient.addColorStop(_.position, _.color);
		});

		return _gradient;
	}

	#drawSymbols () {
		const _fadeFactor = this.fadeRandom ? MATRIX_HELPERS.randomNumber(this.fadeRandom) : this.fadeFactor;
		const _backgroundRgb = MATRIX_HELPERS.convertHexToRGB(this.backgroundColor);

		this.ctx.fillStyle = `rgba(${_backgroundRgb.r}, ${_backgroundRgb.g}, ${_backgroundRgb.b}, ${_fadeFactor})`;
		this.ctx.textAlign = 'center';
		this.ctx.fillRect(0, 0, this.width, this.height);
		this.ctx.font  = `${this.fontSize}px monospace`;
		this.symbols.forEach(_ => _());
	}

	draw (timestamp = 0) {
		if (this.setInterval) {
			console.info(`[INFO]: Rain effect applied using setInterval - ${this.setInterval}`);
			setInterval(() => {
				this.#drawSymbols();
			}, this.setInterval);
		} else {
			const _delta = timestamp - this.lastTime;
			this.lastTime = timestamp;

			if (this.timer > this.nextFrame) {
				this.#drawSymbols();
				this.timer = 0;
			} else {
				this.timer += _delta;
			}

			requestAnimationFrame(this.draw.bind(this));
			if (timestamp === 0) {
				console.info('[INFO]: Rain effect applied using requestAnimationFrame')
			};
		}

		return this;
	}

	resize () {
		window.addEventListener('resize', () => {
			this.#canvasSize();
			this.columns = Math.ceil(this.width / this.fontSize);
			this.symbols = this.#initialiseSymbols();
		});
	}
}
