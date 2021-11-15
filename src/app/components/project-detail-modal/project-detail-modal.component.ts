/* istanbul ignore file */

import { Component, Inject, Optional } from '@angular/core'
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog'
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { Project } from '../../models/project.model'
import { Repository } from '../../models/repository.model'

@Component({
    selector: 'app-project-detail-modal',
    templateUrl: './project-detail-modal.component.html',
    styleUrls: ['./project-detail-modal.component.scss']
})
export class ProjectDetailModalComponent {
    public project: Project
    public selectedRepository: Repository

    constructor(
        @Optional() @Inject(MAT_DIALOG_DATA) private dialogData: { project: Project },
        @Optional() @Inject(MAT_BOTTOM_SHEET_DATA) private bottomSheetData: { project: Project },
        @Optional() private dialogRef: MatDialogRef<ProjectDetailModalComponent>,
        @Optional() private bottomSheetRef: MatBottomSheetRef<ProjectDetailModalComponent>
    ) {
        this.project = this.dialogData ? this.dialogData.project : this.bottomSheetData.project
        if (this.project.repositories || this.project.repositories.length > 0)
            this.selectedRepository = this.project.repositories[0]
    }
}
