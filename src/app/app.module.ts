import { DxListModule } from 'devextreme-angular/ui/list';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SideNavOuterToolbarModule, SideNavInnerToolbarModule, SingleCardModule } from './layouts';
import { FooterModule, ResetPasswordFormModule, CreateAccountFormModule, ChangePasswordFormModule, LoginFormModule } from './shared/components';
import { AuthService, ScreenService, AppInfoService } from './shared/services';
import { UnauthenticatedContentModule } from './unauthenticated-content';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProductsComponentsComponent } from './pages/Products Components/products-components/products-components.component';
import { ProductsComponentsVersionsComponent } from './pages/Products Components/products-components-versions/products-components-versions.component';
import { TestCasesComponent } from './pages/test-cases/test-cases.component';
import { TestSessionComponent } from './pages/Test Sessions/test-session/test-session.component';
import { TestCaseRunComponent } from './pages/Test Sessions/test-case-run/test-case-run.component';
import { TestCaseRunsAnalysisComponent } from './pages/test-case-runs-analysis/test-case-runs-analysis.component';
import { TotalBugsComponent } from './pages/Reports/total-bugs/total-bugs.component';
import { TotalTestSessionsComponent } from './pages/Reports/total-test-sessions/total-test-sessions.component';
import { TestSessionsCompareComponent } from './pages/Reports/test-sessions-compare/test-sessions-compare.component';
import { TotalTestCasesRunComponent } from './pages/Reports/total-test-cases-run/total-test-cases-run.component';
import { TestCasesRunCompareComponent } from './pages/Reports/test-cases-run-compare/test-cases-run-compare.component';
import { TestSessionsEvolutionComponent } from './pages/Reports/test-sessions-evolution/test-sessions-evolution.component';
import { TestCasesRunEvolutionComponent } from './pages/Reports/test-cases-run-evolution/test-cases-run-evolution.component';
import { RuntimeEvolutionByAtcodeRevisionComponent } from './pages/Reports/runtime-evolution-by-atcode-revision/runtime-evolution-by-atcode-revision.component';
import { RuntimeEvolutionByProductVersionComponent } from './pages/Reports/runtime-evolution-by-product-version/runtime-evolution-by-product-version.component';
import { TestCasesRuntimeEvolutionComponent } from './pages/Reports/test-cases-runtime-evolution/test-cases-runtime-evolution.component';
import { DeliveryComponent } from './pages/delivery/delivery.component';
import { EventsComponent } from './pages/events/events.component';
import { SettingsUsersComponent } from './pages/Settings/settings-users/settings-users.component';
import { SettingsAtboxComponent } from './pages/Settings/settings-atbox/settings-atbox.component';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponentsDetailComponent } from './sous pages/products-components-detail/products-components-detail.component';
import { DetailPopUpComponent } from './shared/components/detail-pop-up/detail-pop-up.component';
import { ProductsComponentsVersionsDetailComponent } from './sous pages/products-components-versions-detail/products-components-versions-detail.component';
import { DxAccordionModule, DxButtonModule, DxDataGridModule, DxDateBoxModule, DxLoadPanelModule, DxPopupModule, DxScrollViewModule, DxTemplateModule } from 'devextreme-angular';
import { TestCaseRunDetailsComponent } from './sous pages/test-case-run-details/test-case-run-details.component';
import { TestCaseRunSousDetailsComponent } from './sous pages/test-case-run-sous-details/test-case-run-sous-details.component';
import { TestSessionDetailComponent } from './sous pages/test-session-detail/test-session-detail.component';
import { HistoryComponent } from './pages/history/history.component';
import { CookieService } from 'ngx-cookie-service';
import { AlertMsgComponent } from './shared/components/alert-msg/alert-msg.component';


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
    AlertMsgComponent
  ],
  imports: [
    BrowserModule,
    SideNavOuterToolbarModule,
    SideNavInnerToolbarModule,
    SingleCardModule,
    FooterModule,
    ResetPasswordFormModule,
    CreateAccountFormModule,
    ChangePasswordFormModule,
    LoginFormModule,
    UnauthenticatedContentModule,
    AppRoutingModule,
    HttpClientModule,
    DxDataGridModule,
    DxPopupModule,
    DxButtonModule,
    DxTemplateModule,
    DxAccordionModule,
    DxScrollViewModule,
    DxListModule,
    DxDateBoxModule
  ],
  providers: [AuthService, ScreenService, AppInfoService, CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
