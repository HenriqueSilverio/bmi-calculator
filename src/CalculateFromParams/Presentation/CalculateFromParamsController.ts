import IController from './IController'
import CalculateFromParamsRequestDTO from './CalculateFromParamsRequestDTO'
import CalculateFromParamsResponseDTO from './CalculateFromParamsResponseDTO'
import IUseCase from '../Application/IUseCase'

export default class CalculateFromParamsController implements IController {
  private readonly useCase: IUseCase

  constructor(useCase: IUseCase) {
    this.useCase = useCase
  }

  public async execute(request: CalculateFromParamsRequestDTO): Promise<CalculateFromParamsResponseDTO> {
    const input = {
      height: request.height,
      weight: request.weight,
    }

    const output = await this.useCase.execute(input)

    const response = {
      id: output.id,
      value: output.value.toFixed(2),
      category: output.category,
    }

    return response
  }
}
