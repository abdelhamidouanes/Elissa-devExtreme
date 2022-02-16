import { DxListModule } from 'devextreme-angular/ui/list';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponentsComponent } from './pages/products-components/products-components/products-components.component';
import { ProductsComponentsVersionsComponent } from './pages/products-components/products-components-versions/products-components-versions.component';
import { TestCasesComponent } from './pages/test-cases/test-cases.component';
import { TestSessionComponent } from './pages/test-sessions/test-session/test-session.component';
import { TestCaseRunComponent } from './pages/test-sessions/test-case-run/test-case-run.component';
import { TestCaseRunsAnalysisComponent } from './pages/test-case-runs-analysis/test-case-runs-analysis.component';
import { TotalBugsComponent } from './pages/reports/total-bugs/total-bugs.component';
import { TotalTestSessionsComponent } from './pages/reports/total-test-sessions/total-test-sessions.component';
import { TestSessionsCompareComponent } from './pages/reports/test-sessions-compare/test-sessions-compare.component';
import { TotalTestCasesRunComponent } from './pages/reports/total-test-cases-run/total-test-cases-run.component';
import { TestCasesRunCompareComponent } from './pages/reports/test-cases-run-compare/test-cases-run-compare.component';
import { TestSessionsEvolutionComponent } from './pages/reports/test-sessions-evolution/test-sessions-evolution.component';
import { TestCasesRunEvolutionComponent } from './pages/reports/test-cases-run-evolution/test-cases-run-evolution.component';
import { RuntimeEvolutionByAtcodeRevisionComponent } from './pages/reports/runtime-evolution-by-atcode-revision/runtime-evolution-by-atcode-revision.component';
import { RuntimeEvolutionByProductVersionComponent } from './pages/reports/runtime-evolution-by-product-version/runtime-evolution-by-product-version.component';
import { TestCasesRuntimeEvolutionComponent } from './pages/reports/test-cases-runtime-evolution/test-cases-runtime-evolution.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { EventsComponent } from './pages/events/events.component';
import { SettingsUsersComponent } from './pages/settings/settings-users/settings-users.component';
import { SettingsAtboxComponent } from './pages/settings/settings-atbox/settings-atbox.component';
import { DetailPopUpComponent } from './shared/components/detail-pop-up/detail-pop-up.component';
import { ProductsComponentsVersionsDetailComponent } from './sub-pages/products-components-versions-detail/products-components-versions-detail.component';
import { DxButtonModule, DxCalendarModule, DxChartModule, DxDataGridModule, DxFormModule, DxLoadPanelModule, DxPopupModule, DxSelectBoxModule, DxTextBoxModule, DxToastModule, DxValidationSummaryModule, DxValidatorModule } from 'devextreme-angular';
import { TestCaseRunDetailsComponent } from './sub-pages/test-case-run-details/test-case-run-details.component';
import { TestCaseRunSousDetailsComponent } from './sub-pages/test-case-run-sous-details/test-case-run-sous-details.component';
import { EditPopUpComponent } from './sub-pages/edit-pop-up/edit-pop-up.component';
import { TestSessionDetailComponent } from './sub-pages/test-session-detail/test-session-detail.component';
import { HistoryComponent } from './pages/history/history.component';
import { CookieService } from 'ngx-cookie-service';
import { AlertMsgComponent } from './shared/components/alert-msg/alert-msg.component';
import { DetailPopUpSousDetailComponent } from './shared/components/detail-pop-up-sous-detail/detail-pop-up-sous-detail.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponentsDetailComponent } from './sub-pages/products-components-detail/products-components-detail.component';
import { DescriptionPopUpComponent } from './shared/components/description-pop-up/description-pop-up.component';
import { DxAccordionModule, DxDateBoxModule, DxScrollViewModule, DxTemplateModule } from 'devextreme-angular';
import { ChangepasswordComponent } from './pages/settings/changepassword/changepassword.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ProductsComponentsComponent,
    ProductsComponentsVersionsComponent,
    TestCasesComponent,
    TestSessionComponent,
    TestCaseRunComponent,
    TestCaseRunsAnalysisComponent,
    TotalBugsComponent,
    TotalTestSessionsComponent,
    TestSessionsCompareComponent,
    TotalTestCasesRunComponent,
    TestCasesRunCompareComponent,
    TestSessionsEvolutionComponent,
    TestCasesRunEvolutionComponent,
    RuntimeEvolutionByAtcodeRevisionComponent,
    RuntimeEvolutionByProductVersionComponent,
    TestCasesRuntimeEvolutionComponent,
    DeliveryComponent,
    EventsComponent,
    SettingsUsersComponent,
    SettingsAtboxComponent,
    ProductsComponentsDetailComponent,
    DetailPopUpComponent,
    ProductsComponentsVersionsDetailComponent,
    TestCaseRunDetailsComponent,
    TestCaseRunSousDetailsComponent,
    TestSessionDetailComponent,
    HistoryComponent,
    AlertMsgComponent,
    DetailPopUpSousDetailComponent,
    DescriptionPopUpComponent,
    ChangepasswordComponent,
    EditPopUpComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule,
    DxDataGridModule,
    DxPopupModule,
    DxTemplateModule,
    DxAccordionModule,
    DxButtonModule,
    DxScrollViewModule,
    DxTextBoxModule,
    DxChartModule,
    DxFormModule,
    DxValidatorModule,
    DxValidationSummaryModule,
    DxSelectBoxModule,
    DxListModule,
    DxDateBoxModule,
    DxCalendarModule,
    DxToastModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
