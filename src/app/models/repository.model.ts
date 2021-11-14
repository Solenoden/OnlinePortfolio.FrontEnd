export class Repository {
    id: number
    name: string
    description: string
    projectId: number
    cicd: string
    cloudInfrastructure: string
    url: string
    starCount: number
    watcherCount: number
    forkCount: number
    openIssueCount: number
    tags: string[]
    technologies: string[]
    skills: string[]
    createdAt: number
    updatedAt: number

    public static fromJson(jsonObj: Record<string, unknown>): Repository {
        const repository = new Repository()
        repository.id = jsonObj.id as number
        repository.name = jsonObj.name as string
        repository.description = jsonObj.description as string
        repository.projectId = jsonObj.projectId as number
        repository.cicd = jsonObj.cicd as string
        repository.cloudInfrastructure = jsonObj.cloudInfrastructure as string
        repository.url = jsonObj.url as string
        repository.starCount = jsonObj.starCount as number
        repository.watcherCount = jsonObj.watcherCount as number
        repository.forkCount = jsonObj.forkCount as number
        repository.openIssueCount = jsonObj.openIssueCount as number
        repository.tags = jsonObj.name as string[]
        repository.technologies = jsonObj.technologies as string[]
        repository.skills = jsonObj.skills as string[]
        repository.createdAt = jsonObj.createdAt as number
        repository.updatedAt = jsonObj.updatedAt as number

        return repository
    }
}