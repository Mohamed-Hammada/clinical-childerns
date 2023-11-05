import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SecretaryPageComponent } from './secretary-page/secretary-page.component';
import { DoctorsDashboardComponent } from './doctors-dashboard/doctors-dashboard.component';
import { ChildCardComponent } from './child-card/child-card.component';
import { ChildHistoryComponent } from './child-history/child-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table'
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatCardModule } from '@angular/material/card';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatIconModule} from '@angular/material/icon';
import { ChildTableComponent } from './child-table/child-table.component';
import { ViewToggleComponent } from './view-toggle/view-toggle.component';

@NgModule({
  declarations: [
    AppComponent,
    SecretaryPageComponent,
    DoctorsDashboardComponent,
    ChildCardComponent,
    ChildHistoryComponent,
    ChildTableComponent,
    ViewToggleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIconModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
