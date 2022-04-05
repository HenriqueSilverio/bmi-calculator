import IUseCase from '../Application/IUseCase'
import CalculateFromParamsController from './CalculateFromParamsController'

const useCase: jest.Mocked<IUseCase> = {
  execute: jest.fn(),
}

beforeEach(() => {
  useCase.execute.mockClear()
})

describe('CalculateFromParamsController', () => {
  describe('CalculateFromParamsController.execute', () => {
    test('Given valid request, response should be valid', async () => {
      const request = {
        height: 165,
        weight: 72,
      }

      const input = {
        height: request.height,
        weight: request.weight,
      }

      useCase.execute.mockResolvedValueOnce({
        id: '6245eca0ddb1266af5a50768',
        value: 26.45,
        category: 'overweight',
      })

      const controller = new CalculateFromParamsController(useCase)

      const response = await controller.execute(request)

      expect(useCase.execute).toHaveBeenCalledTimes(1)
      expect(useCase.execute).toHaveBeenCalledWith(input)

      expect(response).toHaveProperty('id')
      expect(response.id).toBe('6245eca0ddb1266af5a50768')

      expect(response).toHaveProperty('value')
      expect(response.value).toBe('26.45')

      expect(response).toHaveProperty('category')
      expect(response.category).toBe('overweight')
    })
  })
})
