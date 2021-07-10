const authenticate = require('./authenticate')

describe("Authenticate middleware", () => {
    let mReq;
    let mRes;
    let mNext;

    afterEach(() => {
        jest.clearAllMocks()
    })

    test("test with undefined req header", () => {
        mReq = { headers: undefined }
        mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mNext = jest.fn()

        let expectedError = {
            error: TypeError("Cannot read property 'auth-token' of undefined")
        }

        authenticate(mReq, mRes, mNext)

        expect(mNext).toBeCalledTimes(0)
        expect(mRes.status).toBeCalledTimes(1)
        expect(mRes.status).toBeCalledWith(500)
        expect(mRes.status().json).toBeCalledTimes(1)
        expect(mRes.status().json).toBeCalledWith(expectedError)
    })
    test("test with defined req header & undefined token", () => {
        mReq = { headers: { "auth-token": jest.fn(() => undefined) }}
        mRes = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mNext = jest.fn()

        authenticate(mReq, mRes, mNext)

        expect(mNext).toBeCalledTimes(0)
        expect(mRes.status).toBeCalledTimes(1)
        expect(mRes.status).toBeCalledWith(500)
        expect(mRes.status().json).toBeCalledTimes(1)
        // expect(mRes.status().json).toBeCalledWith({error: "[JsonWebTokenError: jwt must be a string]"})
    })
    test("test with true token", () => {
        mReq
    })
})