const { createCipheriv, createDecipheriv } = require('crypto')

class CryptoHelper {
  constructor({ cryptoKey }) {
    // aes-192-ecb
    // aes = Advanced Ecryption Standard
    // 192 bits da key
    // chave de 24 caracteres * 8 = 192 bits 
    // ecb = Electronic Code Book
    // More examples 'unix $ openssl -cipher-algorithms'

    this.cryptoConfig = Object.values({
      algorithm: 'aes-192-ecb',
      cryptoKey,
      initializationVectorKey: null
    }) 
  }

  static async setup({ cryptoKey}) {
    return new CryptoHelper({ cryptoKey })
  }

  async encrypt(data) {
    const cipher =   createCipheriv(...this.cryptoConfig)
    return cipher
    // Pode ser base68 ou hex
    .update(data, 'utf8', 'base64')
    .concat(cipher.final('base64'))
  }

  async decrypt(data) {
    const cipher =   createDecipheriv(...this.cryptoConfig)
    return cipher
    .update(data.toString(), 'base64', 'utf8')
    .concat(cipher.final('utf8'))
  }
}

module.exports = CryptoHelper