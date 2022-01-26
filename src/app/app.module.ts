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
import { HistoryElissaComponent } from './pages/History/history-elissa/history-elissa.component';
import { HistoryProjeqtorComponent } from './pages/History/history-projeqtor/history-projeqtor.component';
import { HistoryLogsComponent } from './pages/History/history-logs/history-logs.component';
import { SettingsUsersComponent } from './pages/Settings/settings-users/settings-users.component';
import { SettingsAtboxComponent } from './pages/Settings/settings-atbox/settings-atbox.component';
import { DxAccordionModule, DxDataGridModule, DxListModule, DxPopupModule } from 'devextreme-angular';
import { HttpClientModule } from '@angular/common/http';
import { ProductsComponentsDetailComponent } from './sous pages/products-components-detail/products-components-detail.component';
import { TestSessionDetailsComponent } from './sous pages/test-session-details/test-session-details.component';


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
    HistoryElissaComponent,
    HistoryProjeqtorComponent,
    HistoryLogsComponent,
    SettingsUsersComponent,
    SettingsAtboxComponent,
    ProductsComponentsDetailComponent,
    TestSessionDetailsComponent
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
    DxAccordionModule,
    DxListModule,
   
  ],
  providers: [AuthService, ScreenService, AppInfoService],
  bootstrap: [AppComponent]
})
export class AppModule { }
