'use strict';
const express = require('express');
const app = express();
const graphqlExpress = require("express-graphql");
const schema = require('./graphql/Schema').Schema;

app.set('port', (process.env.PORT || 4000));
app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost:${app.get('port')}`)
});

//add the schema to graphql-express 
app.use('/graphql', graphqlExpress({
    schema: schema,
    rootValue: global,
    graphiql: true
}));