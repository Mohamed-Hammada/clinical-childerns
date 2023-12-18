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
import { ChildHistoryTableComponent } from './child-history-table/child-history-table.component';
import { ChildHistoryCardsComponent } from './child-history-cards/child-history-cards.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CreateUpdateMedicalRecordComponent } from './create-update-medical-record/create-update-medical-record.component';
import {  MatChipsModule} from '@angular/material/chips';
import {  MatAutocompleteModule} from '@angular/material/autocomplete';
import { CustomChipComponent } from './custom-chip/custom-chip.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import { DataService } from './services/DataService';
import { HttpClientModule } from '@angular/common/http';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    SecretaryPageComponent,
    DoctorsDashboardComponent,
    ChildCardComponent,
    ChildHistoryComponent,
    ChildTableComponent,
    ViewToggleComponent,
    ChildHistoryTableComponent,
    ChildHistoryCardsComponent,
    PageNotFoundComponent,
    CreateUpdateMedicalRecordComponent,
    CustomChipComponent,
    NavigationComponent,
    
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
    MatIconModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatSidenavModule,
    HttpClientModule,
    MatToolbarModule,
    MatListModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatNativeDateModule, // Import the MatNativeDateModule here
    MatSnackBarModule,
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSidenavModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
