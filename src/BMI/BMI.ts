import ValueObject from '../Shared/Domain/ValueObject'

export interface BMIProps {
  value: number,
  category: string,
}

export interface BMICalcParams {
  height: number,
  weight: number,
}

export default class BMI extends ValueObject<BMIProps> {
  private constructor(props: BMIProps) {
    super(props)
  }

  public static create(props: Pick<BMIProps, 'value'>): BMI {
    if (!Number.isFinite(props.value) || props.value <= 0) {
      throw new Error('Invalid BMI value')
    }
    const category = BMI.classify(props.value)
    return new BMI({ category, ...props })
  }

  public static calc(params: BMICalcParams): BMI {
    const height = params.height / 100
    const result = params.weight / (height * height)
    const value = parseFloat(result.toFixed(2))
    return BMI.create({ value })
  }

  private static BMICategories = {
    underweight: 'underweight',
    normalWeight: 'normal weight',
    overweight: 'overweight',
    obesity: 'obesity',
  }

  private static classify(bmi: number): string {
    if (bmi < 18.5) {
      return BMI.BMICategories.underweight
    }
    if (bmi >= 18.5 && bmi <= 24.9) {
      return BMI.BMICategories.normalWeight
    }
    if (bmi >= 25 && bmi <= 29.9) {
      return BMI.BMICategories.overweight
    }
    return BMI.BMICategories.obesity
  }

  public valueOf(): BMIProps {
    return this.props
  }
}
