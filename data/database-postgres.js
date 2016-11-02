import Sequelize from 'sequelize';

import _ from 'lodash';
import Faker from 'faker';

const Conn = new Sequelize(
	'widgets', 
	'postgres',
	'postgres',
	{
		dialect: 'postgres',
		host: 'localhost'
	}
);

const Widget = Conn.define('widget',{
	name: {
		type: Sequelize.STRING,
		allowNull: false
	}
}); 

const addWidget = function(name) {
	return Widget.create({
		name: name
	})
}

Conn.sync({
	force: false
}).then(()=> {
	_.times(10, ()=>{
		return Widget.create({
			name: Faker.name.firstName()
		})
	})
});

export {
	Conn,
	addWidget
}; 