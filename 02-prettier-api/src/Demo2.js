import React from 'react';
import './App.css';

import Right1 from './Right1';
import Right2 from './Right2';

class Demo2 extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			rightAreaUpdated: false,
		};

		this.updateState = this.updateState.bind(this);
	}

	updateState () {
		this.setState({
			rightAreaUpdated: !this.state.rightAreaUpdated
		});
	}

	render() {
		const rightPanel = this.state.rightAreaUpdated ? <Right2 updateHandler={this.updateState} /> : <Right1 updateHandler={this.updateState} />;
		return (
			<div className="App">
				<div className="col">
					Left area that remains same
				</div>
				<div className="col-middle"></div>
				<div className="col col-code">
					{rightPanel}
				</div>
			</div>
		);
	}
}

export default Demo2;
