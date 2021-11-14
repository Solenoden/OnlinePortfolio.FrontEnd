import { Component, OnInit } from '@angular/core'
import { StateService } from '../../services/state.service'
import { Project } from '../../models/project.model'

@Component({
    selector: 'app-projects-page',
    templateUrl: './projects-page.component.html',
    styleUrls: ['./projects-page.component.scss']
})
export class ProjectsPageComponent implements OnInit {
    public allProjects: Project[] = []
    public projectsToDisplay: Project[] = []
    public projectSearchText: string = undefined
    public currentPageNumber = 1
    public couldNotRetrieveProjects = false

    constructor(
        private stateService: StateService
    ) {}

    ngOnInit(): void {
        this.getProjects()
    }

    private getProjects(): void {
        this.stateService.getProjects().subscribe(result => {
            this.allProjects = result
            this.projectsToDisplay = this.allProjects
        }, () => {
            this.couldNotRetrieveProjects = true
        })
    }

    public searchProjects(): void {
        this.projectsToDisplay = this.projectSearchText.trim().length === 0 ? this.allProjects : this.allProjects.filter(
            project => project.name.toLowerCase().includes(this.projectSearchText.trim().toLowerCase())
        )
    }
}
