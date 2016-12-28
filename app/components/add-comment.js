import Ember from 'ember';

export default Ember.Component.extend({
	tagName:'div',
	classNames:['input-group'],
	post:null,
	comment1:null,
	actions:{
		save(){
			//this.get('parentController').send('saveComment',this.get('post'))			
			this.sendAction('action',this.get('comment1'),this.get('postid'));
			this.set('comment1',null);
		}
	}
});
