import sql from 'mssql'

const config = {
    server: 'localhost',
    port: 1433,
    options: { encrypt:false, database: 'shop' },
    authentication:{
        type:"default",
        options:{
            userName:"sa",
            password:"Star8903!@"
        }
    }
};

const con = async() => {
    try {
        const pool = await sql.connect(config)
            .then((pool) => {
                console.log('Connected to MSSQL')
                return pool;
            })
        return pool;
    } catch(err) {
        console.log(err)
    }
}



export {con}