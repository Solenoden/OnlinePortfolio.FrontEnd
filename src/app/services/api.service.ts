import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { Project } from '../models/project.model'
import { environment } from '../../environments/environment'
import { ApiCallError } from '../errors/app.errors'
import { JsonConvert, ValueCheckingMode } from 'json2typescript'

@Injectable({ providedIn: 'root' })
export class ApiService {
    constructor(
        private httpClient: HttpClient
    ) {
    }

    private static createHeaders(): HttpHeaders {
        const headers = new HttpHeaders()
        headers.set('Content-Type', 'application/json')

        return headers
    }

    public getProjects(): Observable<Project[]> {
        return new Observable<Project[]>(observer => {
            const endpoint = environment.backendUrl + '/projects'

            this.httpClient.get(
                endpoint,
                {
                    headers: ApiService.createHeaders(),
                    observe: 'response'
                }
            ).subscribe(result => {
                const deserializer = new JsonConvert()
                deserializer.valueCheckingMode = ValueCheckingMode.ALLOW_NULL
                const projects = deserializer.deserializeArray(result.body as any[], Project)

                observer.next(projects)
            }, error => {
                observer.error(new ApiCallError('GET', endpoint, error))
            }, () => {
                observer.complete()
            })
        })
    }
}