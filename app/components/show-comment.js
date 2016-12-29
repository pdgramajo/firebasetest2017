import Ember from 'ember';

export default Ember.Component.extend({
    tagName:'div',
    classNames:['col-sm-8'],
    actions:{
        
        deleteComment(){
            
            this.sendAction('action',this.get('data'));
        }
        
    }
});
