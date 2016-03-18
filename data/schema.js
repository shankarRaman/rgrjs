import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} from 'graphql';

let Schema = (db) => {
  let store ={};

  let storeType = new GraphQLObjectType({
    name: 'Store',
    fields: () => ({
      links: {
        type: new GraphQLList(linkType),
        resolve: () => db.collection("links").find({}).toArray()
      }
    })
  });

  let linkType = new GraphQLObjectType({
		name: 'Link',
		fields: () => ({
			_id: {type: GraphQLString},
			url: {type: GraphQLString},
			title: {type: GraphQLString}
		})
	});

	let schema = new GraphQLSchema({
		query: new GraphQLObjectType({
			name: 'Query',
			fields: () => ({
				store: {
					type: storeType,
					resolve: () => store
				},
        message: {
          type: GraphQLString,
          resolve: () => "Hello GraphQL Again"
        }
			})
		})
	});
	return schema;
}

export default Schema;
