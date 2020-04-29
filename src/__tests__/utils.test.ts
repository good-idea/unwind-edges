import { definitely } from '../utils'

describe('definitely', () => {
  it('should remove all undefined and null values from an array', () => {
    const arr = ['a', 'b', undefined, null, 'e']
    const values = definitely(arr)
    expect(values.length).toBe(3)
  })

  it('should return an empty array when given null or undefined', () => {
    expect(definitely(null)).toStrictEqual([])
    expect(definitely(undefined)).toStrictEqual([])
  })
})
