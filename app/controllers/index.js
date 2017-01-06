import Ember from 'ember';

export default Ember.Controller.extend({
    needs:['application'],
    formIsVisible:false,
    application_var: Ember.computed.alias("controllers.application"),
    dataSelected: function () {
        var filter = this.get('filter');
        if(filter){
        return this.get('model').filter(function (item) {
            var regexp = new RegExp(filter, 'gi');
            return item.data.title.toLowerCase().match(regexp);           
        });
        }else{
             return this.get('model');
        }
    }.property('filter'),
    
    actions:{
		viewForm(){
			this.set('formIsVisible',true);
		},
		hideForm(){
		    this.set('formIsVisible',false);
		},
		savePost(){
		    
		    const title = this.get('title');
		    const body = this.get('body');
		    
		     var newpost =   this.get('store').createRecord('post', {
                  title: title,
                  description:body
                });
                var self = this;
                newpost.save().then(function(post){
                    self.transitionToRoute('post', post);
                }).catch(function(e){
                    console.log('error: ',e);
                });
            
			this.set('formIsVisible',false);
			this.set('title','');
			this.set('body','');
		},
		deletePost(post){
		/* let post1 = this.store.peekRecord('post', post.id);
            post1.get('comments').then((comments) => {
                comments.forEach(function(comment) {
                       comment.destroyRecord();
                    });
            });*/
            
		 post.destroyRecord();
		}
		
	}
    
});
