import { getScript } from '../src/util/util'

describe('should call callback after script get loaded', () => {
    it('knows when google plateform js downloaded', () => {
      getScript('https://apis.google.com/js/platform.js', () => {
        expect(gapi).toBeDefined()
      })
    })
})
