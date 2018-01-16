import React from 'react';
import { connect } from 'react-redux';
import BlogPostForm from './BlogPostForm';
import { startEditPost, startRemovePost } from '../actions/posts';

export class EditPostPage extends React.Component {
	constructor() {
		super();
	}

	onSubmit = post => {
		this.props.startEditPost(this.props.post.id, post);
		this.props.history.push('/');
	};

	onRemove = () => {
		this.props.startRemovePost({ id: this.props.post.id });
		this.props.history.push('/');
	};

	render() {
		return (
			<div>
				<div className="page-header">
					<div className="content-container">
						<h1 className="page-header__title">Edit Post</h1>
					</div>
				</div>
				<div className="content-container">
					<BlogPostForm 
						post={this.props.post}
						onSubmit={this.onSubmit}
					/>
				</div>
				<button className="button__secondary" onClick={this.onRemove}>Remove Post</button>
			</div>
		);
	}
}

const mapStateToProps = (state, props) => ({
	post: state.posts.find((post) => post.id === props.match.params.id)
});

const mapDispatchToProps = (dispatch, props) => ({
	startEditPost: (id, post) => dispatch(startEditPost(id, post)),
	startRemovePost: (data) => dispatch(startRemovePost(data))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditPostPage);
