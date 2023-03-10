const setpath = 'https://keystore-cli-backend.onrender.com/updatekey'
const fs = require('fs');
const axios = require('axios');
const path = require('path');
const chalk = require('chalk') ;
const log = console.log ;

const UpDate = async (id, data) => {
    const filePath=path.join(__dirname+'/authStorage/authToken.txt')
    const authtoken = fs.readFileSync(filePath, 'utf8')
    if(!authtoken){
        log(chalk.bgYellow.bold('First SignIn To update Data'))
        return
    }
    const data1={
        "key":data.key,
        "value":data.value,
        'ttl':data.ttl,
        "authtoken":authtoken,
        "id":id
    }
    try {
        
        await axios.put(setpath,data1).
        then((res)=>{
            log(chalk.bgGreen.bold("Data Updated"));
            process.exit(0);
        })

    } catch (error) {
        log(chalk.bgRed.bold(error.response.data.msg));
        process.exit(1);
    }

}

module.exports = UpDate
