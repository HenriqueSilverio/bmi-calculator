/* eslint-disable no-console */

import express, {
  Request,
  RequestHandler,
  Response,
  NextFunction,
} from 'express'

import Database from 'better-sqlite3'

import Config from '../Shared/Config/Config'
import CalculateFromParamsSQLiteRepository from '../CalculateFromParams/DataAccess/CalculateFromParamsSQLiteRepository'
import CalculateFromParamsUseCase from '../CalculateFromParams/Application/CalculateFromParamsUseCase'
import CalculateFromParamsController from '../CalculateFromParams/Presentation/CalculateFromParamsController'
import CalculateFromParamsRequestDTO from '../CalculateFromParams/Presentation/CalculateFromParamsRequestDTO'

type AsyncRequestHandler = (...args: Parameters<RequestHandler>) => Promise<void>

const asyncHandler = (fn: AsyncRequestHandler) => (
  (request: Request, response: Response, next: NextFunction) => {
    Promise.resolve(fn(request, response, next))
      .catch(next)
  }
)

const sqlite = new Database(Config.sqliteDatabase)

const setup = sqlite.prepare(`
  CREATE TABLE IF NOT EXISTS results (
    value FLOAT NOT NULL,
    category TEXT NOT NULL
  )
`)

setup.run()

const repository = new CalculateFromParamsSQLiteRepository(sqlite)
const useCase = new CalculateFromParamsUseCase(repository)
const controller = new CalculateFromParamsController(useCase)

const webserver = express()

webserver.use(express.json())
webserver.use(express.urlencoded({ extended: false }))

webserver.post('/bmi/calculate', asyncHandler(async (request: Request, response: Response) => {
  const body = request.body as CalculateFromParamsRequestDTO

  const input = {
    height: body.height,
    weight: body.weight,
  }

  const output = await controller.execute(input)

  response.json(output)
}))

const start = () => {
  webserver.listen(3000, () => console.log('[ express ] Listening'))
}

start()
