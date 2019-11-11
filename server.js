import express from 'express';
import graphqlExpress from "express-graphql";
import { Schema } from "./graphql/Schema";
import dotenv from "dotenv";
dotenv.config();

const app = express();

app.set('port', (process.env.PORT));
app.listen(app.get('port'), () => {
    console.log(`Node app is running at localhost:${app.get('port')}`)
});

//add the schema to graphql-express 
app.use('/graphql', graphqlExpress({
    schema: Schema,
    rootValue: global,
    graphiql: true
}));