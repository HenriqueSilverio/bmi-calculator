import CalculateFromParamsInputDTO from './CalculateFromParamsInputDTO'
import CalculateFromParamsOutputDTO from './CalculateFromParamsOutputDTO'

export default interface IUseCase {
  execute(input: CalculateFromParamsInputDTO): Promise<CalculateFromParamsOutputDTO>
}
