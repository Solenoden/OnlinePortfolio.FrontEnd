import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { environment } from '../../environments/environment'
import { CacheService } from './cache.service'
import { ApiCallError } from '../errors/app.errors'
import { Injectable } from '@angular/core'

@Injectable({ providedIn: 'root' })
export class HttpService {
    private baseUrl: string = environment.backendUrl as string

    constructor(
       private httpClient: HttpClient,
       private cacheService: CacheService
    ) {}

    private getAuthenticationToken(): Observable<string> {
        return new Observable<string>(observer => {
            const token = this.cacheService.getAuthenticationToken()

            if (!token) {
                const endpoint = environment.backendUrl + '/api/v1/authenticate'

                this.httpClient.post(
                    endpoint,
                    { serviceToken: environment.backendServiceToken as string },
                    { observe: 'body' }
                ).subscribe(result => {
                    const data = result as { authenticationToken: string }
                    const authenticationToken = data.authenticationToken
                    this.cacheService.setAuthenticationToken(authenticationToken)

                    observer.next(authenticationToken)
                    observer.complete()
                }, error => {
                    observer.error(error)
                })
            } else {
                observer.next(token)
                observer.complete()
            }
        })
    }

    private createHeaders(): Observable<HttpHeaders> {
        return new Observable<HttpHeaders>(observer => {
            this.getAuthenticationToken().subscribe(result => {
                const headers = new HttpHeaders()
                    .set('Content-Type', 'application/json')
                    .set('Authorization', `Bearer ${result}`)

                observer.next(headers)
                observer.complete()
            }, error => {
                observer.error(error)
            })
        })
    }

    public get(endpointUrl: string): Observable<Record<string, unknown> | Record<string, unknown>[]> {
        return new Observable<Record<string, unknown> | Record<string, unknown>[]>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.createHeaders().subscribe(result => {
                this.httpClient.get(
                    fullUrl,
                    {
                        headers: result,
                        observe: 'body'
                    }
                ).subscribe(result => {
                    observer.next(result as Record<string, unknown> | Record<string, unknown>[])
                }, error => {
                    observer.error(new ApiCallError('GET', fullUrl, error))
                }, () => {
                    observer.complete()
                })
            }, error => {
                observer.error(error)
            })
        })
    }

    public post(endpointUrl: string, body: unknown): Observable<Record<string, unknown> | Record<string, unknown>[]> {
        return new Observable<Record<string, unknown> | Record<string, unknown>[]>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.createHeaders().subscribe(result => {
                this.httpClient.post(
                    fullUrl,
                    body,
                    {
                        headers: result,
                        observe: 'body'
                    }
                ).subscribe(result => {
                    observer.next(result as Record<string, unknown> | Record<string, unknown>[])
                }, error => {
                    observer.error(new ApiCallError('POST', fullUrl, error))
                }, () => {
                    observer.complete()
                })
            }, error => {
                observer.error(error)
            })
        })
    }

    public put(endpointUrl: string, body: unknown): Observable<Record<string, unknown> | Record<string, unknown>[]> {
        return new Observable<Record<string, unknown> | Record<string, unknown>[]>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.createHeaders().subscribe(result => {
                this.httpClient.put(
                    fullUrl,
                    body,
                    {
                        headers: result,
                        observe: 'body'
                    }
                ).subscribe(result => {
                    observer.next(result as Record<string, unknown> | Record<string, unknown>[])
                }, error => {
                    observer.error(new ApiCallError('PUT', fullUrl, error))
                }, () => {
                    observer.complete()
                })
            }, error => {
                observer.error(error)
            })
        })
    }

    public patch(endpointUrl: string, body: unknown): Observable<Record<string, unknown> | Record<string, unknown>[]> {
        return new Observable<Record<string, unknown> | Record<string, unknown>[]>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.createHeaders().subscribe(result => {
                this.httpClient.patch(
                    fullUrl,
                    body,
                    {
                        headers: result,
                        observe: 'body'
                    }
                ).subscribe(result => {
                    observer.next(result as Record<string, unknown> | Record<string, unknown>[])
                }, error => {
                    observer.error(new ApiCallError('PATCH', fullUrl, error))
                }, () => {
                    observer.complete()
                })
            }, error => {
                observer.error(error)
            })
        })
    }

    public delete(endpointUrl: string): Observable<Record<string, unknown> | Record<string, unknown>[]> {
        return new Observable<Record<string, unknown> | Record<string, unknown>[]>(observer => {
            const fullUrl = this.baseUrl + endpointUrl

            this.createHeaders().subscribe(result => {
                this.httpClient.delete(
                    fullUrl,
                    {
                        headers: result,
                        observe: 'body'
                    }
                ).subscribe(result => {
                    observer.next(result as Record<string, unknown> | Record<string, unknown>[])
                }, error => {
                    observer.error(new ApiCallError('DELETE', fullUrl, error))
                }, () => {
                    observer.complete()
                })
            }, error => {
                observer.error(error)
            })
        })
    }
}