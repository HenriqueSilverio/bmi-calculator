import CalculateFromParamsRecordDTO from './CalculateFromParamsRecordDTO'

export default interface IRepository {
  insertOne(record: Omit<CalculateFromParamsRecordDTO, 'id'>): Promise<CalculateFromParamsRecordDTO>
}
