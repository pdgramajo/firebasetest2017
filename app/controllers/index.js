import Ember from 'ember';

export default Ember.Controller.extend({

    formIsVisible:false,
    	
    actions:{
		viewForm(){
			this.set('formIsVisible',true);
		},
		savePost(){
		    
		    const title = this.get('title');
		    const body = this.get('body');
		    
		 var newpost =   this.get('store').createRecord('post', {
              title: title,
              description:body
            });
		    newpost.save();
			this.set('formIsVisible',false);
			this.setProperties({
                      title: '',
                      body: ''
                    })
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
