import React from 'react';
import './App.css';

import prettier from 'prettier/standalone';
import babelParser from 'prettier/parser-babel';

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			code: '',
			output: ''
		};

		this.handleInputChange = this.handleInputChange.bind(this);
		this.formatCode = this.formatCode.bind(this);
	}

	handleInputChange (event) {
		const target = event.target;
		const value = target.value;
		const name = target.name;
	
		this.setState({
			[name]: value
		});
	}

	formatCode () {
		try {
			const options = {
				parser: 'babel',
    			plugins: [babelParser]
			};
			const codeFormatted = prettier.format(this.state.code, options);
			console.log(codeFormatted);
			this.setState({
				output: codeFormatted
			});
		} catch (err) {
			this.setState({
				output: 'Error in formatting code, please check your console for errors'
			});
			console.error(err);
		}
	}

	render() {
		return (
			<div className="App">
				<div className="col">
					<label>Enter your code here</label>
					<textarea
						name="code"
						value={this.state.code}
						onChange={this.handleInputChange}
					>
						Please enter your code here
					</textarea>
				</div>
				<div className="col-middle">
					<button
						onClick={this.formatCode}
					>
						Format
					</button>
				</div>
				<div className="col col-code">
					<label>Formatted Code</label>
					<div>
						<pre>{this.state.output}</pre>
					</div>
				</div>
			</div>
		);
	}
}

export default App;
