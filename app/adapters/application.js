import DS from 'ember-data';

export default DS.RESTAdapter.extend({
	host: 'http://emberwebapi.gear.host',/// 'http://localhost:58797',//
	namespace: 'api'
});
