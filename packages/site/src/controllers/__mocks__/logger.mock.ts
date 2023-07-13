
export const mockLog = jest.fn()
export const mockError = jest.fn()
jest.mock('@src/controllers/logger', () => {
  return jest.fn().mockImplementation(() => {
    return {
      log: mockLog,
      error: mockError  
    }
  })
})

