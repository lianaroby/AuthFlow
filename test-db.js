
const pool = require('./database');

async function testConnection() {
    try {
        const result = await pool.query('SELECT NOW()');

        console.log('Database connected successfully!');
        console.log('PostgreSQL time:', result.rows[0].now);

    }
    catch (error){

    console.log('Database connection failed:');
console.error(error);}
    finally {
        await pool.end();
    }
}

testConnection();
