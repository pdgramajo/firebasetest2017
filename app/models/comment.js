import DS from 'ember-data';

export default DS.Model.extend({
	text:DS.attr('string'),
	postId:DS.attr('number'),
	post: DS.belongsTo('post')
});
