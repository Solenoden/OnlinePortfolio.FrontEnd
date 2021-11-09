import { JsonObject, JsonProperty } from 'json2typescript'

@JsonObject('Repository')
export class Repository {
    @JsonProperty('id', Number)
    id: number

    @JsonProperty('name', String)
    name: string

    @JsonProperty('description', String)
    description: string

    @JsonProperty('projectId', Number)
    projectId: number

    @JsonProperty('cicd', String)
    cicd: string

    @JsonProperty('cloudInfrastructure', String)
    cloudInfrastructure: string

    @JsonProperty('url', String)
    url: string

    @JsonProperty('starCount', Number)
    starCount: number

    @JsonProperty('watcherCount', Number)
    watcherCount: number

    @JsonProperty('forkCount', Number)
    forkCount: number

    @JsonProperty('openIssueCount', Number)
    openIssueCount: number

    @JsonProperty('tags', [String])
    tags: string[]

    @JsonProperty('technologies', [String])
    technologies: string[]

    @JsonProperty('skills', [String])
    skills: string[]

    @JsonProperty('createdAt', Number)
    createdAt: number

    @JsonProperty('updatedAt', Number)
    updatedAt: number
}