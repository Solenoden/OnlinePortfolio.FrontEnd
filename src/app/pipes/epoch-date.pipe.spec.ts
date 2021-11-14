import { EpochDatePipe } from './epoch-date.pipe'

describe('test epochDatePipe', () => {
    let pipe: EpochDatePipe

    beforeEach(() => {
        pipe = new EpochDatePipe()
    })

    it('should convert the epoch into a YYYY-MM-DD format', () => {
        const result = pipe.transform(1636903218000)

        void expect(result).toEqual('2021-11-14')
    })
})