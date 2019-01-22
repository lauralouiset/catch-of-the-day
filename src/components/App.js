import React, { Component } from 'react';
import "../css/style.css";

import Header from './Header';
import Inventory from "./Inventory";
import Order from "./Order";
import Fish from './Fish';
import base from '../base'
import sampleFishes from '../sample-fishes';



class App extends Component {
	state = {
		fishes: {},
		order: {}
	}
	componentDidMount(){
		const {params} = this.props.match;

		// first reinstate our local storage
		const localStorageRef = localStorage.getItem(params.storeId);
		if(localStorageRef){
			console.log(localStorageRef);
			this.setState({
				order: JSON.parse(localStorageRef)
			})
		}

		this.ref = base.syncState(`${params.storeId}/fishes`,
		{
		context: this,
		state: "fishes"
		});
	}

	componentDidUpdate(){
		localStorage.setItem( this.props.match.params.storeId, JSON.stringify(this.state.order));
		}

	componentWillUnmount(){
		base.removeBinding(this.ref);
	}


	addFish = fish => {
		// 1. make a copy of existing state
		const fishes = {...this.state.fishes};
		// 2. Add our new fishes to our new state object
		fishes[`fish${Date.now()}`] = fish;
		// 3. set the new fishes object to state
		this.setState({fishes});
	}

	loadSampleFishes = () => {
		this.setState({fishes : sampleFishes});
	}

	addToOrder = key => {
		// 1. make a copy of state
		const order = {...this.state.order}
		// 2. either add fish to order or update the number in our order
			order[key] = order[key] + 1 || 1;
		// 3. call setState to update our state object
		this.setState({order});
	}

	render() {
		return (
			<div className="catch-of-the-day">
				<div className="menu">
					<Header tagline="Fresh Seafood Market"/>
					<ul className="fishes">
						{
							Object.keys(this.state.fishes).map( 
								key => <Fish 	key={key}  
															index={key}
															addToOrder={this.addToOrder} 
															details={this.state.fishes[key]} />)
						}
					</ul>
				</div>
					<Order 
							fishes={this.state.fishes} 
							order={this.state.order} />
					<Inventory 
							addFish={this.addFish} 
							loadSampleFishes={this.loadSampleFishes} />
			</div>
		)
	}
}

export default App;