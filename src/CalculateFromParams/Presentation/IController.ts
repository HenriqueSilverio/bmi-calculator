import CalculateFromParamsRequestDTO from './CalculateFromParamsRequestDTO'
import CalculateFromParamsResponseDTO from './CalculateFromParamsResponseDTO'

export default interface IController {
  execute(request: CalculateFromParamsRequestDTO): Promise<CalculateFromParamsResponseDTO>
}
