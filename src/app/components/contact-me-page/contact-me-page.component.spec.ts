import { ComponentFixture, TestBed } from '@angular/core/testing'
import { ContactMePageComponent } from './contact-me-page.component'

describe('ContactMePageComponent', () => {
    let component: ContactMePageComponent
    let fixture: ComponentFixture<ContactMePageComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ ContactMePageComponent ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(ContactMePageComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })
})
