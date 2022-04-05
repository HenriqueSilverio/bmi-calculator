import path from 'path'
import env from 'require-env'

const config = {
  mongoURL: env.require('MONGO_URL'),
  sqliteDatabase: (() => {
    const str = env.require('SQLITE_DATABASE')
    if (str === ':memory:') {
      return str
    }
    return path.join(__dirname, '../../../data/sqlite', `${str}.db`)
  })(),
}

export default config
