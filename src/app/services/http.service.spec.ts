import { HttpService } from './http.service'
import { TestBed } from '@angular/core/testing'
import { HttpClientModule, HttpHeaders } from '@angular/common/http'
import Spy = jasmine.Spy
import { of, throwError } from 'rxjs'
import { environment } from '../../environments/environment'
import { ApiCallError } from '../errors/app.errors'

describe('test HttpService', () => {
    let httpService: HttpService

    let createHeadersSpy: Spy<any>
    let httpGetSpy: Spy<any>
    let httpPostSpy: Spy<any>
    let httpPutSpy: Spy<any>
    let httpPatchSpy: Spy<any>
    let httpDeleteSpy: Spy<any>

    const mockHeaders = new HttpHeaders().set('Content-Type', 'application/json')
    const mockBaseUrl = 'https://mock-domain.co.za'

    beforeEach(() => {
        environment.backendUrl = mockBaseUrl

        TestBed.configureTestingModule({
            imports: [
                HttpClientModule
            ]
        })
        httpService = TestBed.inject(HttpService)

        createHeadersSpy = spyOn(httpService as any, 'createHeaders').and.returnValue(of(mockHeaders))
        httpGetSpy = spyOn(httpService['httpClient'], 'get').and.returnValue(of(undefined))
        httpPostSpy = spyOn(httpService['httpClient'], 'post').and.returnValue(of(undefined))
        httpPutSpy = spyOn(httpService['httpClient'], 'put').and.returnValue(of(undefined))
        httpPatchSpy = spyOn(httpService['httpClient'], 'patch').and.returnValue(of(undefined))
        httpDeleteSpy = spyOn(httpService['httpClient'], 'delete').and.returnValue(of(undefined))
    })

    describe('test getAuthenticationToken', () => {
        let cacheGetAuthTokenSpy: Spy<any>
        let cacheSetAuthTokenSpy: Spy<any>

        const mockAuthToken = 'test-token'

        beforeEach(() => {
            cacheGetAuthTokenSpy = spyOn(httpService['cacheService'], 'getAuthenticationToken').and.returnValue(undefined)
            cacheSetAuthTokenSpy = spyOn(httpService['cacheService'], 'setAuthenticationToken').and.returnValue(undefined)
            httpPostSpy.and.returnValue(of({ authenticationToken: mockAuthToken }))
        })

        it('should attempt to retrieve an existing token from the cache', () => {
            httpService['getAuthenticationToken']().subscribe(() => {
                void expect(cacheGetAuthTokenSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should make an http call to authenticate if a cached token does not exist', () => {
            httpService['getAuthenticationToken']().subscribe(() => {
                void expect(httpPostSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should set the token in the cache after authenticating', () => {
            httpService['getAuthenticationToken']().subscribe(() => {
                void expect(cacheSetAuthTokenSpy).toHaveBeenCalledTimes(1)
                void expect(cacheSetAuthTokenSpy).toHaveBeenCalledWith(mockAuthToken)
            })
        })

        it('should return the token after authenticating', () => {
            httpService['getAuthenticationToken']().subscribe(result => {
                void expect(result).toEqual(mockAuthToken)
            })
        })

        it('should not make an http call to authenticate and return the token if it exists', () => {
            cacheGetAuthTokenSpy.and.returnValue(mockAuthToken)

            httpService['getAuthenticationToken']().subscribe(result => {
                void expect(result).toEqual(mockAuthToken)
                void expect(httpPostSpy).toHaveBeenCalledTimes(0)
            })
        })
    })

    describe('test createHeaders', () => {
        let getAuthenticationTokenSpy: Spy<any>

        const mockAuthToken = 'test-token'

        beforeEach(() => {
            createHeadersSpy.and.callThrough()
            getAuthenticationTokenSpy = spyOn(httpService as any, 'getAuthenticationToken')
                .and.returnValue(of(mockAuthToken))
        })

        it('should retrieve the authentication token', () => {
            httpService['createHeaders']().subscribe(() => {
                void expect(getAuthenticationTokenSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should return http headers with content type set to json', () => {
            httpService['createHeaders']().subscribe(result => {
                void expect(result).toBeInstanceOf(HttpHeaders)
                void expect(result.get('Content-Type')).toEqual('application/json')
            })
        })

        it('should return http headers with an authorization header', () => {
            httpService['createHeaders']().subscribe(result => {
                void expect(result).toBeInstanceOf(HttpHeaders)
                void expect(result.get('Authorization')).toEqual(`Bearer ${mockAuthToken}`)
            })
        })

        it('should return an error if', () => {
            httpService['createHeaders']().subscribe(() => {
                void expect(getAuthenticationTokenSpy).toHaveBeenCalledTimes(1)
            })
        })

    })

    describe('test get', () => {
        it('should create headers', () => {
            httpService.get('/random').subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should return an error if the call to create headers fail', () => {
            createHeadersSpy.and.returnValue(throwError(new Error()))
            httpService.get('/random').subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                void expect(error).toBeTruthy()
            })
        })

        it('should make an http get call to the appropriate url', () => {
            httpService.get('/random').subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
                void expect(httpGetSpy).toHaveBeenCalledWith(
                    mockBaseUrl + '/random',
                    {
                        headers: mockHeaders,
                        observe: jasmine.any(String)
                    }
                )
            })
        })

        it('should return an ApiCallError if the http call fails', () => {
            httpGetSpy.and.returnValue(throwError(new Error()))
            httpService.get('/random').subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                const expectedError = new ApiCallError('GET', mockBaseUrl + '/random', new Error())

                void expect(error).toEqual(expectedError)
            })
        })
    })

    describe('test post', () => {
        const mockBody = { randomData: true }

        it('should create headers', () => {
            httpService.post('/random', mockBody).subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should return an error if the call to create headers fail', () => {
            createHeadersSpy.and.returnValue(throwError(new Error()))
            httpService.post('/random', mockBody).subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                void expect(error).toBeTruthy()
            })
        })

        it('should make an http post call to the appropriate url', () => {
            httpService.post('/random', mockBody).subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
                void expect(httpPostSpy).toHaveBeenCalledWith(
                    mockBaseUrl + '/random',
                    mockBody,
                    {
                        headers: mockHeaders,
                        observe: jasmine.any(String)
                    }
                )
            })
        })

        it('should return an ApiCallError if the http call fails', () => {
            httpPostSpy.and.returnValue(throwError(new Error()))
            httpService.post('/random', mockBody).subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                const expectedError = new ApiCallError('POST', mockBaseUrl + '/random', new Error())

                void expect(error).toEqual(expectedError)
            })
        })
    })

    describe('test put', () => {
        const mockBody = { randomData: true }

        it('should create headers', () => {
            httpService.put('/random', mockBody).subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should return an error if the call to create headers fail', () => {
            createHeadersSpy.and.returnValue(throwError(new Error()))
            httpService.put('/random', mockBody).subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                void expect(error).toBeTruthy()
            })
        })

        it('should make an http put call to the appropriate url', () => {
            httpService.put('/random', mockBody).subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
                void expect(httpPutSpy).toHaveBeenCalledWith(
                    mockBaseUrl + '/random',
                    mockBody,
                    {
                        headers: mockHeaders,
                        observe: jasmine.any(String)
                    }
                )
            })
        })

        it('should return an ApiCallError if the http call fails', () => {
            httpPutSpy.and.returnValue(throwError(new Error()))
            httpService.put('/random', mockBody).subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                const expectedError = new ApiCallError('PUT', mockBaseUrl + '/random', new Error())

                void expect(error).toEqual(expectedError)
            })
        })
    })

    describe('test patch', () => {
        const mockBody = { randomData: true }

        it('should create headers', () => {
            httpService.patch('/random', mockBody).subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should return an error if the call to create headers fail', () => {
            createHeadersSpy.and.returnValue(throwError(new Error()))
            httpService.patch('/random', mockBody).subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                void expect(error).toBeTruthy()
            })
        })

        it('should make an http patch call to the appropriate url', () => {
            httpService.patch('/random', mockBody).subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
                void expect(httpPatchSpy).toHaveBeenCalledWith(
                    mockBaseUrl + '/random',
                    mockBody,
                    {
                        headers: mockHeaders,
                        observe: jasmine.any(String)
                    }
                )
            })
        })

        it('should return an ApiCallError if the http call fails', () => {
            httpPatchSpy.and.returnValue(throwError(new Error()))
            httpService.patch('/random', mockBody).subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                const expectedError = new ApiCallError('PATCH', mockBaseUrl + '/random', new Error())

                void expect(error).toEqual(expectedError)
            })
        })
    })

    describe('test delete', () => {
        it('should create headers', () => {
            httpService.delete('/random').subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
            })
        })

        it('should return an error if the call to create headers fail', () => {
            createHeadersSpy.and.returnValue(throwError(new Error()))
            httpService.delete('/random').subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                void expect(error).toBeTruthy()
            })
        })

        it('should make an http delete call to the appropriate url', () => {
            httpService.delete('/random').subscribe(() => {
                void expect(createHeadersSpy).toHaveBeenCalledTimes(1)
                void expect(httpDeleteSpy).toHaveBeenCalledWith(
                    mockBaseUrl + '/random',
                    {
                        headers: mockHeaders,
                        observe: jasmine.any(String)
                    }
                )
            })
        })

        it('should return an ApiCallError if the http call fails', () => {
            httpDeleteSpy.and.returnValue(throwError(new Error()))
            httpService.delete('/random').subscribe(() => {
                fail('should have thrown an error')
            }, error => {
                const expectedError = new ApiCallError('DELETE', mockBaseUrl + '/random', new Error())

                void expect(error).toEqual(expectedError)
            })
        })
    })
})