const CryptoHelper =  require('./src/cryptoHelper')
const app = require('./src/app');
const CustomFspromises = require('./src/customFspromises');
const Decoraton = require('./src/decoraton');

(async () => {
  const config = {
    // aes-192-ecb
    // 24 caractares
    cryptoKey: 'minha-senha-super-segura'
  }
  
  const cryptoHelper =  await CryptoHelper.setup(config)
  const customFspromises =  new CustomFspromises({ cryptoHelper }).configure()
  Decoraton.decorateModule(customFspromises, require('fs').promises)
 
  await app.run()
})()