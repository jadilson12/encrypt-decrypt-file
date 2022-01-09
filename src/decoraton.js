const { eventOrder } = require('./constants')

class Decoraton {
static  #decoraton = ({ fn, when }, oldfn) => async (...args) => {
    const [ first, secord ] = when === eventOrder.afterOriginalCall ?
    [oldfn, fn] :
    [fn, oldfn]

    const result = await first.apply(this, args)
    const defaultFormat = Array.isArray(result ) ? result : [result]
    return secord.apply(this, defaultFormat)
  }
  static decorateModule(overriderModule, target) {
    const moduleClone = Object.assign({}, target)

    const finalFunction = new Map()
    for( const [key, value] of overriderModule) {
      const oldfn = Reflect.get(moduleClone, key)
       finalFunction.set(key, this.#decoraton(value, oldfn) )
    }
    const newFunction = Object.fromEntries(finalFunction)
    Object.assign(target, newFunction)
  }
}

module.exports = Decoraton