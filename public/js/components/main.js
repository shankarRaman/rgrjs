import React  from 'react';
import Relay from 'react-relay';
import CreateLinkMutation from '../mutations/CreateLinkMutation'
import Link from "./link";

class Main extends React.Component {
	static propTypes = {
		limit: React.PropTypes.number
	};
	static defaultProps = {
		limit: 4
	};
	setLimit = (e) => {
		let newLimit = Number(e.target.value);
		this.props.relay.setVariables({limit: newLimit});
	}
	handleSubmit = (e) => {
		e.preventDefault();
		Relay.Store.update(
			new CreateLinkMutation({
				title: this.refs.newTitle.value,
				url: this.refs.newUrl.value,
				store: this.props.store
			})
		)
		this.refs.newTitle.value = ""
		this.refs.newUrl.value = ""
	}
	render() {
		let content = this.props.store.linkConnection.edges.map(edge => {
			return <Link key={edge.node.id} link={edge.node} />;
		});
		return (
			<div>
				<h3>Links</h3>
				<form onSubmit={this.handleSubmit}>
					<input type="text" placeholder="Title" ref="newTitle" />
					<input type="text" placeholder="Url" ref="newUrl" />
				</form>
				<select onChange={this.setLimit}>
					<option value="1">1</option>
					<option value="5">5</option>
				</select>
				<ul>
					{content}
				</ul>
			</div>
			);
	}
}

Main = Relay.createContainer(Main, {
	initialVariables: {
		limit:3
	},
	fragments: {
		store: () => Relay.QL `
			fragment on Store {
				id,
				linkConnection(first:$limit){
					edges{
						node {
							id,
							${Link.getFragment('link')}
						}
					}
				}
			}
		`
	}
})

export default Main;
