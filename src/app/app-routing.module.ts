import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretaryPageComponent } from './secretary-page/secretary-page.component';
import { DoctorsDashboardComponent } from './doctors-dashboard/doctors-dashboard.component';
import { ChildHistoryComponent } from './child-history/child-history.component';

const routes: Routes = [
  { path: 'secretary', component: SecretaryPageComponent },
  { path: 'doctor', component: DoctorsDashboardComponent },
  { path: 'child-history/:id', component: ChildHistoryComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
