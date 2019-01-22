import React, {Component} from 'react';
import {getFunName} from '../helpers';

import '../css/style.css'

class StorePicker extends Component{ 

	myInput = React.createRef();

	goToStore = (e) => {
		// 1. Prevent form from reloading page
		e.preventDefault();
		// 2. get the text fron that input
		const storeName =  this.myInput.current.value;
		// 3. Change the page to /store/whatever-text-is
		this.props.history.push(`/store/${storeName}`);
	}

	render(){
		return (
		<form className="store-selector" onSubmit={this.goToStore}>
			<h2>Please Enter A Store</h2>
			<input 
				type="text" 
				ref={this.myInput}
				placeholder="Store Name"
				defaultValue={getFunName()} 
				required />
			<button type="submit">Visit Store -> </button>
		</form>
		)
	}

}

export default StorePicker;