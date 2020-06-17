module.exports = { 
    mysql: {
        host: "http://127.0.0.1", // or localhost 
        user: 'root',
        password: '',
        database: '',
        port: '3306'
    },

    mongo: {
        // mongodb connection url here. Note: fill in appropriate details
        url: 'mongodb://<dbuser>:<dbpassword>@<host>:<port>/<db_name>' 
    }
    
}