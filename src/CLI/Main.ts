#!/usr/bin/env node

/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */

import 'dotenv/config'

import { randomUUID } from 'crypto'

import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { MongoClient } from 'mongodb'

import Config from '../Shared/Config/Config'
import CalculateFromParamsMongoRepository from '../CalculateFromParams/DataAccess/CalculateFromParamsMongoRepository'
import CalculateFromParamsUseCase from '../CalculateFromParams/Application/CalculateFromParamsUseCase'
import CalculateFromParamsController from '../CalculateFromParams/Presentation/CalculateFromParamsController'

const argv = yargs(hideBin(process.argv))
  .options({
    height: {
      alias: 'h',
      demandOption: true,
      describe: 'Height in centimeter (CM)',
      type: 'number',
    },
    weight: {
      alias: 'w',
      demandOption: true,
      describe: 'Weight in kilogram (KG)',
      type: 'number',
    },
  })
  .argv

const mongodb = new MongoClient(Config.mongoURL, {
  pkFactory: { createPk: randomUUID },
})

const repository = new CalculateFromParamsMongoRepository(mongodb)
const useCase = new CalculateFromParamsUseCase(repository)
const controller = new CalculateFromParamsController(useCase)

const start = async () => {
  await mongodb.connect()

  const request = {
    height: argv.height,
    weight: argv.weight,
  }

  const output = await controller.execute(request)

  console.log(`BMI: ${output.value} ~ Category: ${output.category} ~ ID: ${output.id}`)
}

start()
  .catch(console.error)
