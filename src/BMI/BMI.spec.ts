import BMI from './BMI'

describe('BMI', () => {
  describe('BMI.calc', () => {
    it('Should be created from height and weight', () => {
      const bmi1 = BMI.calc({ height: 165, weight: 72 })
      expect(bmi1.valueOf()).toEqual({ value: 26.45, category: 'overweight' })
    })
  })
  describe('BMI.create', () => {
    describe('Given a number greater than zero', () => {
      it('Should be created with success', () => {
        const bmi = BMI.create({ value: 26.45 })
        const data = bmi.valueOf()
        expect(data.value).toBeCloseTo(26.45)
      })
    })
    describe('When < 18.5', () => {
      it('Category is "underweight"', () => {
        const bmi = BMI.create({ value: 16 })
        const data = bmi.valueOf()
        expect(data.category).toBe('underweight')
      })
    })
    describe('When >= 18.5 && <= 24.9', () => {
      it('Category is "normal weight"', () => {
        const bmi1 = BMI.create({ value: 18.5 })
        const data1 = bmi1.valueOf()
        const bmi2 = BMI.create({ value: 22 })
        const data2 = bmi2.valueOf()
        const bmi3 = BMI.create({ value: 24.9 })
        const data3 = bmi3.valueOf()
        expect(data1.category).toBe('normal weight')
        expect(data2.category).toBe('normal weight')
        expect(data3.category).toBe('normal weight')
      })
    })
    describe('When >= 25 && <= 29.9', () => {
      it('Category is "overweight"', () => {
        const bmi1 = BMI.create({ value: 25 })
        const data1 = bmi1.valueOf()
        const bmi2 = BMI.create({ value: 27.4 })
        const data2 = bmi2.valueOf()
        const bmi3 = BMI.create({ value: 29.9 })
        const data3 = bmi3.valueOf()
        expect(data1.category).toBe('overweight')
        expect(data2.category).toBe('overweight')
        expect(data3.category).toBe('overweight')
      })
    })
    describe('When >= 30', () => {
      it('Category is "obesity"', () => {
        const bmi1 = BMI.create({ value: 30 })
        const data1 = bmi1.valueOf()
        const bmi2 = BMI.create({ value: 32.6 })
        const data2 = bmi2.valueOf()
        expect(data1.category).toBe('obesity')
        expect(data2.category).toBe('obesity')
      })
    })
    describe('Given NaN, Infinity, zero or negative numbers', () => {
      it('Should throws', () => {
        expect(() => BMI.create({ value: NaN })).toThrow()
        expect(() => BMI.create({ value: Infinity })).toThrow()
        expect(() => BMI.create({ value: -Infinity })).toThrow()
        expect(() => BMI.create({ value: 0 })).toThrow()
        expect(() => BMI.create({ value: -1 })).toThrow()
      })
    })
  })
  describe('BMI.valueOf', () => {
    it('Valid data schema', () => {
      const bmi = BMI.create({ value: 24.6 })
      const data = bmi.valueOf()
      const expected = { value: 24.6, category: 'normal weight' }
      expect(data).toEqual(expected)
    })
  })
  describe('BMI.equals', () => {
    it('Sould be equal', () => {
      const bmi1 = BMI.create({ value: 30 })
      const bmi2 = BMI.create({ value: 30 })
      expect(bmi1.equals(bmi2)).toBe(true)
    })
  })
})
