import BMI from '../../BMI/BMI'
import CalculateFromParamsInputDTO from './CalculateFromParamsInputDTO'
import CalculateFromParamsOutputDTO from './CalculateFromParamsOutputDTO'
import IRepository from './IRepository'

export default class CalculateFromParamsUseCase {
  private repository: IRepository

  constructor(repository: IRepository) {
    this.repository = repository
  }

  public async execute(input: CalculateFromParamsInputDTO): Promise<CalculateFromParamsOutputDTO> {
    const params = {
      height: input.height,
      weight: input.weight,
    }

    const bmi = BMI.calc(params)

    const recorded = await this.repository.insertOne(bmi.valueOf())

    return {
      id: recorded.id,
      value: recorded.value,
      category: recorded.category,
    }
  }
}
