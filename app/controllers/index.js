import Ember from 'ember';

export default Ember.Controller.extend({

    formIsVisible:false,
    dataSelected: function () {
        var filter = this.get('filter');
        if(filter){
        return this.get('model').filter(function (item, index, enumerable) {
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
		updatePost(){
		    
		//    store.findRecord('post', 1).then(function(post) {
        //      post.get('title'); // => "Rails is Omakase"
        //    
        //      post.set('title', 'A new post');
        //    
        //      post.save(); // => PUT to '/posts/1'
        //    });
		}
		
	}
    
});
