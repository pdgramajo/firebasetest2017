import Ember from 'ember';
export default Ember.Controller.extend({
    needs:['application'],
    firebaseApp: Ember.inject.service(),
    formIsVisible:false,
    application_var: Ember.computed.alias("controllers.application"),
    imgFile:null,
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
    //ver la url y adaptarlo
    uploadImage(){ //https://github.com/rmmmp/emberfire-utils/blob/master/addon/services/firebase-util.js 
       return new Ember.RSVP.Promise((resolve, reject) => {
           const file = this.get('imgFile');
           const metadata = {'contentType': file.type };
           const storageRef = this.get('firebaseApp').storage().ref();
            storageRef.child('images/' + file.name).put(file, metadata).then(function(snapshot) {
              var url = snapshot.metadata.downloadURLs[0];
                 resolve(url);
             }).catch(function(error) {
                  reject(error);
             });
        });
    },
    actions:{
		viewForm(){
			this.set('formIsVisible',true);
		},
		hideForm(){
		    this.set('formIsVisible',false);
		},
        didSelectFiles(files, resetInput) {
             this.set('imgFile',files);
         },
		savePost(){
		    this.uploadImage().then((url)=>{
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
		        
		    });
		    
		  
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
