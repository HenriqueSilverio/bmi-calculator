/* eslint-disable no-underscore-dangle */

import { MongoClient } from 'mongodb'
import IRepository from '../Application/IRepository'
import CalculateFromParamsRecordDTO from '../Application/CalculateFromParamsRecordDTO'

export default class CalculateFromParamsMongoRepository implements IRepository {
  private readonly client: MongoClient

  constructor(client: MongoClient) {
    this.client = client
  }

  public async insertOne(record: Omit<CalculateFromParamsRecordDTO, 'id'>): Promise<CalculateFromParamsRecordDTO> {
    const collection = this.client.db('bmi')
      .collection<Omit<CalculateFromParamsRecordDTO, 'id'>>('results')

    const operation = await collection.insertOne(record)

    if (!operation.insertedId) {
      throw new Error('[ mongodb ] Failed to insertOne')
    }

    const document = await collection.findOne({
      _id: operation.insertedId,
    })

    if (!document) {
      throw new Error('[ mongodb ] Failed to findOne')
    }

    return {
      id: document._id.toString(),
      value: document.value,
      category: document.category,
    }
  }
}
