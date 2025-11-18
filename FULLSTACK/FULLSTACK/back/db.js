async function connect() {

    if (global.connection) {
        return global.connection.connect();
    };

    const { Pool } = require("pg");
    const pool = new Pool({
        connectionString: ProcessingInstruction.env.CONECTION
    });

    const client = await pool.connect();
    console.log("criou o pool de conexão!");

    const res = await client.query("select now()");
    console.log(res.rows[0]);

    global.connection = pool
    return client;
}

connect();

// busca todos os usuarios
async function selectCustumers() {
    const client = await connect();
    const res = await client.query("SELECT * FROM usuarios");
    return res.rows;
}

// busca todos os usuarios pelo id
async function selectCustumer(id) {
    const client = await connect();
    const res = await client.query("SELECT * FROM usuarios WHERE ID=$1", [id]);
    return res.rows;
}

// inseri na tabela "usuarios" nome, idade e uf
async function insertCustumer(customer) {
    const client = await connect();
    const sql = "INSERT INTO usuarios(nome, idade, uf) VALUES ($1, $2, $3)";
    const values = [customer.nome, customer.idade, customer.uf]
    await client.query(sql, values);
}

// atualiza o usuario
async function upadateCustumer(id, customer) {
    const client = await connect();
    const sql = "UPADTE usuarios SET nome=$1, idade=$2, uf=$3 WHERE id=$4";
    const values = [customer.nome, customer.idade, customer.uf]
    await client.query(sql, values);
}

// deleta o usuario pelo id
async function deleteCustumer(id){
    const client = await connect();
    const sql = "DELETE FROM usuario WHERE id=$1";
    const values = [id];
    await client.query(sql ,values)
}




module.exports = {
    selectCustumers,
    selectCustumer,
    insertCustumer,
    upadateCustumer,
    deleteCustumer
}