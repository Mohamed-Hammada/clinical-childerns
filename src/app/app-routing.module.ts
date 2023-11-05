import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SecretaryPageComponent } from './secretary-page/secretary-page.component';
import { DoctorsDashboardComponent } from './doctors-dashboard/doctors-dashboard.component';

const routes: Routes = [
  { path: 'secretary', component: SecretaryPageComponent },
  { path: 'doctor', component: DoctorsDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
