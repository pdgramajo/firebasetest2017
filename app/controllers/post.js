import Ember from 'ember';

export default Ember.Controller.extend({
    showmodal:false,
    	actions:{
		saveComment(comment,postid){
			const  post = this.get('store').peekRecord('post', postid);
			const commentobj = this.store.createRecord('comment',{text: comment,postId:postid,post: postid});
			commentobj.save().then((commentresponse)=>{
				post.get('comments').pushObject(commentresponse);
			},(error)=>{				
				alert('error',error);
			});
		},
		deleteComment(comment){
			comment.destroyRecord();
		},
		modalaction(){
			
			this.set('showmodal',true);
		},
		close12(){
			this.set('showmodal',false);
		},
		submit(post){
		  		  post.save().then(()=>{
		  		  	 this.set('showmodal',false);
		  		  }); // => PUT to '/posts/1'
		},
	}
});
