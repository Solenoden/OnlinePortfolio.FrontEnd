import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NavigationBarComponent } from './navigation-bar.component'

describe('NavigationBarComponent', () => {
    let component: NavigationBarComponent
    let fixture: ComponentFixture<NavigationBarComponent>

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ NavigationBarComponent ]
        }).compileComponents()
    })

    beforeEach(() => {
        fixture = TestBed.createComponent(NavigationBarComponent)
        component = fixture.componentInstance
        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    describe('test toggleIsHamburgerMenuOpen', () => {
        it('should toggle the isHamburgerMenuOpen field', () => {
            component.isHamburgerMenuOpen = true
            component.toggleIsHamburgerMenuOpen()
            void expect(component.isHamburgerMenuOpen).toBeFalse()

            component.isHamburgerMenuOpen = false
            component.toggleIsHamburgerMenuOpen()
            void expect(component.isHamburgerMenuOpen).toBeTrue()
        })
    })
})
