import { Database } from 'better-sqlite3'

import IRepository from '../Application/IRepository'
import CalculateFromParamsRecordDTO from '../Application/CalculateFromParamsRecordDTO'

interface SQLiteSelectResult {
  rowid: number,
  value: number,
  category: string,
}

export default class CalculateFromParamsSQLiteRepository implements IRepository {
  private readonly client: Database

  constructor(client: Database) {
    this.client = client
  }

  public async insertOne(record: Omit<CalculateFromParamsRecordDTO, 'id'>): Promise<CalculateFromParamsRecordDTO> {
    const insert = this.client.prepare(`
      INSERT INTO results (value, category) VALUES ($value, $category)
    `)

    const inserResult = insert.run(record)

    if (!inserResult.lastInsertRowid) {
      throw new Error('[ sqlite ] Failed to insertOne')
    }

    const select = this.client.prepare(`
      SELECT rowid, value, category
      FROM results
      WHERE rowid = $rowID
    `)

    const selectResult = select.get({
      rowID: inserResult.lastInsertRowid,
    }) as SQLiteSelectResult

    if (!selectResult) {
      throw new Error('[ sqlite ] Failed to findOne')
    }

    return Promise.resolve({
      // eslint-disable-next-line no-underscore-dangle
      id: String(selectResult.rowid),
      value: selectResult.value,
      category: selectResult.category,
    })
  }
}
