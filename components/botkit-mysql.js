const mysql = require('mysql');

module.exports = (config) => ({
    get: (material, search_phrase) => {
        const connection = mysql.createConnection(config);

        return new Promise((resolve, reject) => {
            try {
                connection.connect();
                const query = `SELECT * FROM ${material} ` +
                    `WHERE tema LIKE '%${search_phrase}%' ` +
                    `OR titulo LIKE '%${search_phrase}%' ` +
                    `LIMIT 5`;
                connection.query(query, (err, rows) => {
                    err ? reject(err) : resolve(rows);
                });
            } finally {
                connection.end();
            }
        });
    }
});