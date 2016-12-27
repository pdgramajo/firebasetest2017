import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: 'http://localhost:58797',// 'http://emberwebapi.gear.host',
	namespace: 'api'
});
