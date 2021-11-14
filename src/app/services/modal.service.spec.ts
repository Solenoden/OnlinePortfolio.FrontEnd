import { TestBed } from '@angular/core/testing'
import { ModalService } from './modal.service'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatBottomSheetModule, MatBottomSheetRef } from '@angular/material/bottom-sheet'
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog'
import { ProjectDetailModalComponent } from '../components/project-detail-modal/project-detail-modal.component'
import Spy = jasmine.Spy
import { Project } from '../models/project.model'
import { Repository } from '../models/repository.model'

describe('test modalService', () => {
    let modalService: ModalService

    const mockProject = new Project()
    mockProject.name = 'Test Project'
    mockProject.description = 'Testy Project'
    mockProject.repositories = [ new Repository() ]
    const mockModalData = { project: mockProject }

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                MatBottomSheetModule,
                MatDialogModule,
                BrowserAnimationsModule
            ],
            providers: [
                ModalService
            ]
        })

        modalService = TestBed.inject(ModalService)
    })

    describe('test openResponsiveModal', () => {
        let openBottomSheetSpy: Spy
        let openDialogSpy: Spy

        beforeEach(() => {
            openBottomSheetSpy = spyOn(modalService, 'openBottomSheet').and.callThrough()
            openDialogSpy = spyOn(modalService, 'openDialog').and.callThrough()
        })

        it('should open a bottom sheet if the window width is mobile size', () => {
            spyOnProperty(window, 'innerWidth', 'get').and.returnValue(700)
            modalService.openResponsiveModal(ProjectDetailModalComponent, mockModalData)

            void expect(openBottomSheetSpy).toHaveBeenCalledTimes(1)
        })

        it('should open a dialog if the window width is desktop size', () => {
            spyOnProperty(window, 'innerWidth', 'get').and.returnValue(850)
            modalService.openResponsiveModal(ProjectDetailModalComponent, mockModalData)

            void expect(openDialogSpy).toHaveBeenCalledTimes(1)
        })
    })

    describe('test openBottomSheet', () => {
        let bottomSheetOpenSpy

        beforeEach(() => {
            bottomSheetOpenSpy = spyOn(modalService, 'openBottomSheet').and.callThrough()
        })

        it('should open a bottom sheet', () => {
            modalService.openBottomSheet(ProjectDetailModalComponent, mockModalData)

            void expect(bottomSheetOpenSpy).toHaveBeenCalledTimes(1)
        })

        it('should return a reference to the bottom sheet', () => {
            const reference = modalService.openBottomSheet(ProjectDetailModalComponent, mockModalData)

            void expect(reference).toBeTruthy()
            void expect(reference).toBeInstanceOf(MatBottomSheetRef)
        })
    })

    describe('test openDialog', () => {
        let dialogOpenSpy

        beforeEach(() => {
            dialogOpenSpy = spyOn(modalService, 'openDialog').and.callThrough()
        })

        it('should open a dialog', () => {
            modalService.openDialog(ProjectDetailModalComponent, mockModalData)

            void expect(dialogOpenSpy).toHaveBeenCalledTimes(1)
        })

        it('should return a reference to the dialog', () => {
            const reference = modalService.openDialog(ProjectDetailModalComponent, mockModalData)

            void expect(reference).toBeTruthy()
            void expect(reference).toBeInstanceOf(MatDialogRef)
        })
    })
})