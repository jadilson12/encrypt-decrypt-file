const { eventOrder } = require('./constants')

class CustomFspromises {
  constructor({ cryptoHelper }) {
    this.cryptoHelper = cryptoHelper
  }

  async writeFile (filename, data, encoding) {
    const encryptedtext = await this.cryptoHelper.encrypt(data)
    return  Object.values({
      filename,
      encryptedtext,
      encoding
    })
  }

  async readFile(data) {
    return await this.cryptoHelper.decrypt(data)

  }

  configure () {
    const configuration = new Map()

    const writeFileOptions =  {
      when: eventOrder.beforeOriginalCall,
      fn: this.writeFile.bind(this)
    }
    configuration.set(this.writeFile.name, writeFileOptions)
   

    const readFileOptions =  {
      when: eventOrder.afterOriginalCall,
      fn: this.readFile.bind(this)
    }
    configuration.set(this.readFile.name, readFileOptions)
    return configuration
  }
}

module.exports = CustomFspromises