import BMI from '../../BMI/BMI'
import IRepository from './IRepository'
import CalculateFromParamsUseCase from './CalculateFromParamsUseCase'

const repository: jest.Mocked<IRepository> = {
  insertOne: jest.fn(),
}

beforeEach(() => {
  repository.insertOne.mockClear()
})

describe('CalculateFromParamsUseCase', () => {
  test('CalculateFromParamsUseCase.execute', async () => {
    const input = {
      height: 165,
      weight: 72,
    }

    const output = {
      id: '5e94efa8-39ba-4662-b0e1-69dc49ec51da',
      category: 'overweight',
      value: 26.45,
    }

    repository.insertOne.mockResolvedValue(output)

    const useCase = new CalculateFromParamsUseCase(repository)
    const result = await useCase.execute(input)

    expect(repository.insertOne).toHaveBeenCalledTimes(1)

    const bmi = BMI.calc(input)
    expect(repository.insertOne).toHaveBeenCalledWith(bmi.valueOf())

    expect(result).toEqual(output)
  })
})
