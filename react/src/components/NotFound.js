import React, { Component } from 'react';

class NotFound extends Component {
	render() {
		return (
			<div className="not-found-404">
				<img className="img-404" src="" alt="Error 404" />
				<h1 className="h1-404">Sorry</h1>
				<h2 className="h2-404">That page does not exist!</h2>
			</div>
		);
	}
}

export default NotFound;