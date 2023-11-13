import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretaryPageComponent } from './secretary-page/secretary-page.component';
import { DoctorsDashboardComponent } from './doctors-dashboard/doctors-dashboard.component';
import { ChildHistoryComponent } from './child-history/child-history.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUpdateMedicalRecordComponent } from './create-update-medical-record/create-update-medical-record.component';

const routes: Routes = [
  { path: '', redirectTo: '/doctor', pathMatch: 'full' }, // Redirect to 'doctor' as the default route
  { path: 'secretary', component: SecretaryPageComponent },
  { path: 'doctor', component: DoctorsDashboardComponent },
  { path: 'child-history/:id', component: ChildHistoryComponent },
  { path: 'medical-edits', component: CreateUpdateMedicalRecordComponent },
  { path: '**', component: PageNotFoundComponent }, // Wildcard route for a 404 page
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
