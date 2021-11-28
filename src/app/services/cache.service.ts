import { Injectable } from '@angular/core'
import { Project } from '../models/project.model'

enum StorageKey {
    AuthenticationToken = 'authenticationToken',
    Projects = 'projects'
}

@Injectable({ providedIn: 'root' })
export class CacheService {
    public getProjects(): Project[] {
        const json = JSON.parse(sessionStorage.getItem(StorageKey.Projects)) as Record<string, unknown>[]
        return json ? json.map(jsonObj => Project.fromJson(jsonObj)) : undefined
    }

    public setProjects(projects: Project[]): void {
        sessionStorage.setItem(StorageKey.Projects, JSON.stringify(projects))
    }

    public removeProjects(): void {
        sessionStorage.removeItem(StorageKey.Projects)
    }

    public getAuthenticationToken(): string {
        return sessionStorage.getItem(StorageKey.AuthenticationToken)
    }

    public setAuthenticationToken(authenticationToken: string): void {
        sessionStorage.setItem(StorageKey.AuthenticationToken, authenticationToken)
    }

    public removeAuthenticationToken(): void {
        sessionStorage.removeItem(StorageKey.AuthenticationToken)
    }
}