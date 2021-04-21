import '@babel/polyfill';

import app from './server';


//esta es mi funcion princial
async function main() {
    //app es nuestro servidor
    await app.listen(app.get('port'));
   
    console.log('Server on port', app.get('port'));



}

main();