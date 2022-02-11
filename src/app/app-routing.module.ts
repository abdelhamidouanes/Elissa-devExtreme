import { ChangepasswordComponent } from './pages/Settings/changepassword/changepassword.component';
import { TestSessionComponent } from './pages/Test Sessions/test-session/test-session.component';
import { TestCasesComponent } from './pages/test-cases/test-cases.component';
import { ProductsComponentsVersionsComponent } from './pages/Products Components/products-components-versions/products-components-versions.component';
import { ProductsComponentsComponent } from './pages/Products Components/products-components/products-components.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginFormComponent} from './shared/components';
import { AuthGuardService } from './shared/services';
import { DxDataGridModule, DxFormModule } from 'devextreme-angular';
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
import { TestCaseRunDetailsComponent } from './sous pages/test-case-run-details/test-case-run-details.component';
import { HistoryComponent } from './pages/history/history.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'productscomponents',
    component: ProductsComponentsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'productscomponentsversions',
    component: ProductsComponentsVersionsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'testcases',
    component: TestCasesComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'testsession',
    component: TestSessionComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'testcaserun',
    component: TestCaseRunComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'testcaserunsanalysis',
    component: TestCaseRunsAnalysisComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'totalbugs',
    component: TotalBugsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'totaltestsessions',
    component: TotalTestSessionsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'testsessionscompare',
    component: TestSessionsCompareComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'totaltestcasesrun',
    component: TotalTestCasesRunComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'testcasesruncompare',
    component: TestCasesRunCompareComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'testsessionsevolution',
    component: TestSessionsEvolutionComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'testcasesrunevolution',
    component: TestCasesRunEvolutionComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'runtimeevolutionbyatcoderevision',
    component: RuntimeEvolutionByAtcodeRevisionComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'runtimeevolutionbyproductversion',
    component: RuntimeEvolutionByProductVersionComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'testcasesruntimeevolution',
    component: TestCasesRuntimeEvolutionComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'delivery',
    component: DeliveryComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'historyElissa',
    component: HistoryComponent,
    data: {type: 'Elissa'},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'historyProjector',
    component: HistoryComponent,
    data: {type: 'Projector'},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'historyLogs',
    component: HistoryComponent,
    data: {type: 'Logs'},
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'settingsusers',
    component: SettingsUsersComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'changepassword',
    component: ChangepasswordComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'settingsatbox',
    component: SettingsAtboxComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: 'login-form',
    component: LoginFormComponent,
    canActivate: [ AuthGuardService ]
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), DxDataGridModule, DxFormModule],
  providers: [AuthGuardService],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }
