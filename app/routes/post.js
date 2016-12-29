import Ember from 'ember';

export default Ember.Route.extend({
	model(params){
		return this.get('store').findRecord('post', params.post_id);
	},
	actions:{
		saveComment(comment,postid){
			const  post = this.get('store').peekRecord('post', postid);
			const commentobj = this.store.createRecord('comment',{text: comment,postId:postid,post: postid});
			commentobj.save().then(function(commentresponse){
				post.get('comments').pushObject(commentresponse);
			},function(){				
				alert('error');
			});
		},
		deleteComment(comment){
			comment.destroyRecord();
		}
	}
});
