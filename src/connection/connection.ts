import { Sequelize } from "sequelize-typescript";
import { Product } from "../models/product/product"
const connection = new Sequelize({
    database: 'postgres',
    dialect: 'postgres',
    username: 'postgres',
    password: 'Bedrock2004',
    storage: ':memory:',
    models: [
    Product
    ]
});
async function connectionDB(){
    try{
        await connection.sync();
    }catch(e){
        console.log(e);
    }
}

export default connectionDB;