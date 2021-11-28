import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { LandingPageComponent } from './components/landing-page/landing-page.component'
import { NavigationBarComponent } from './components/common/navigation-bar/navigation-bar.component'
import { HomePageComponent } from './components/home-page/home-page.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { AboutMePageComponent } from './components/about-me-page/about-me-page.component'
import { SocialMediaRibbonComponent } from './components/common/social-media-ribbon/social-media-ribbon.component'
import { MatIconModule } from '@angular/material/icon'
import { HttpClientModule } from '@angular/common/http'
import { ProjectsPageComponent } from './components/projects-page/projects-page.component'
import { FormsModule } from '@angular/forms'
import { NgxPaginationModule } from 'ngx-pagination'
import { MatInputModule } from '@angular/material/input'
import { ProjectDetailModalComponent } from './components/project-detail-modal/project-detail-modal.component'
import { MatSelectModule } from '@angular/material/select'
import { EpochDatePipe } from './pipes/epoch-date.pipe'
import { MatBottomSheetModule } from '@angular/material/bottom-sheet'
import { MatDialogModule } from '@angular/material/dialog'
import { ContactMePageComponent } from './components/contact-me-page/contact-me-page.component'
import { GithubIconComponent } from './components/common/github-icon/github-icon.component'
import { LinkedinIconComponent } from './components/common/linkedin-icon/linkedin-icon.component'

@NgModule({
    declarations: [
        AppComponent,
        LandingPageComponent,
        NavigationBarComponent,
        HomePageComponent,
        AboutMePageComponent,
        SocialMediaRibbonComponent,
        ProjectsPageComponent,
        ProjectDetailModalComponent,
        EpochDatePipe,
        ContactMePageComponent,
        GithubIconComponent,
        LinkedinIconComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatIconModule,
        HttpClientModule,
        FormsModule,
        NgxPaginationModule,
        MatInputModule,
        MatSelectModule,
        MatBottomSheetModule,
        MatDialogModule
    ],
    bootstrap: [
        AppComponent
    ]
})
export class AppModule { }
