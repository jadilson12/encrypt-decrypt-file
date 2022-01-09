 const { promises } = require('fs')

 async function run() {
  const fileTarget = 'super-secure-file.enc'
  console.log('writing file to', fileTarget)
  
  const text = `É agora ${new Date().toISOString()}`
  await promises.writeFile(fileTarget, text)
  console.log('decryped content: ', (await promises.readFile(fileTarget)).toString() )
  console.log('finished')
 }

 module.exports = { run }