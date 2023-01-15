import React from 'react';

class Right2 extends React.Component {
	constructor(props) {
		super(props);
		this.updateHandler = props.updateHandler.bind(this);
	}
	
	render() {
		return (
			<div className="right-area">
				<button onClick={this.updateHandler}>Back to Screen 1</button>
				<p>Right Area 2 - Second Screen</p>
			</div>
		);
	}
}

export default Right2;
