import { paginate } from '../'
const dogs = [
  { id: 1, name: 'frank' },
  { id: 2, name: 'ursula' },
  { id: 3, name: 'cheddar' },
  { id: 4, name: 'muenster' },
]

describe('paginate', () => {
  it('should return a paginated version of an array', async () => {
    const paginated = paginate(dogs, {}, {})
    expect(paginated.edges[0].node.name).toBe('frank')
    expect(paginated.edges[1].node.name).toBe('ursula')
    expect(paginated.edges[2].node.name).toBe('cheddar')
    expect(paginated.edges[3].node.name).toBe('muenster')
    // expect(a).toBe(b)
  })

  it('should trim the set based on pagination args (first)', async () => {
    const paginated = paginate(dogs, { first: 2 })
    expect(paginated.edges.length).toBe(2)
    expect(paginated.pageInfo.hasNextPage).toBe(true)
    expect(paginated.edges[0].node.name).toBe('frank')
    expect(paginated.edges[1].node.name).toBe('ursula')
  })

  it("should automatically assign a key by the node's id", async () => {
    const paginated = paginate(dogs)
    expect(paginated.edges[0].cursor).toBe(1)
    expect(paginated.edges[1].cursor).toBe(2)
  })

  it("should automatically assign a key by the node's _id", async () => {
    const paginated = paginate(dogs.map(({ id, name }) => ({ _id: id, name })))
    expect(paginated.edges[0].cursor).toBe(1)
    expect(paginated.edges[1].cursor).toBe(2)
  })

  it('should use a custom key to get the cursor', () => {
    const paginated = paginate(dogs, {}, { cursorKey: 'name' })
    expect(paginated.edges[0].cursor).toBe('frank')
    expect(paginated.edges[1].cursor).toBe('ursula')
  })

  it('should return an undefined cursor if it cannot find a property', () => {
    const paginated = paginate(dogs.map(({ name }) => ({ name })))
    expect(paginated.edges[0].cursor).toBe(undefined)
    expect(paginated.edges[1].cursor).toBe(undefined)
  })
})
