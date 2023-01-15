import React from 'react';

class Right1 extends React.Component {
	constructor(props) {
		super(props);
		this.updateHandler = props.updateHandler.bind(this);
	}

	render() {
		return (
			<div className="right-area">
				<div>Right Area 1</div>
				<br />
				<button onClick={this.updateHandler}>Update to Screen 2</button>
			</div>
		);
	}
}

export default Right1;
