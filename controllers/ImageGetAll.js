const listpath='https://keystore-cli-backend.onrender.com/imageGetAll'
const fs = require('fs');
const axios = require( 'axios' );
const path=require('path')
const chalk = require('chalk') ;
const log = console.log ;

const ImageGetAll=async()=>{
    const filePath=path.join(__dirname+'/authStorage/authToken.txt');
    const authtoken = fs.readFileSync(filePath, 'utf8');
    if(!authtoken){
      log(chalk.red.bold('First SignIn  !! '))
      return
  }
    const data={
        "authtoken":authtoken
    }
    try {
      await axios.post(listpath,data).
      then((res)=>{
        const images=res.data;
        log(chalk.green("Images Names --> "));
        images.map((img)=>{
            log(chalk.cyan(img.img_name)) ;
        })
      })
    process.exit(0);
    } catch (error) {
      log(chalk.yellow(error.response.data.msg));
      process.exit(1);
    }

}
module.exports=ImageGetAll
