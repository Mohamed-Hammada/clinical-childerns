import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Input } from '@angular/core';
import { DummyDataService } from '../services/dummy-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Child } from '../models/child.model';
import { of, Observable, map, tap } from 'rxjs';
import { DataService } from '../services/DataService';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakService } from 'keycloak-angular';
@Component({
  selector: 'app-child-history',
  templateUrl: './child-history.component.html',
  styleUrls: ['./child-history.component.css']
})
export class ChildHistoryComponent {

  currentPage: number = 0;
  totalPages: number = -1;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20, 50, 100, 200, 500];
  totalRecords: number = -1;
  childId: string | null = '';
  currentChildId: number = -1;
  currentChild!: any;
  medicalRecords: any[] = [];
  private baseUrl = environment.apiUrl;
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  isCardView: boolean = true; // Default to card view
  displayedColumns: string[] = ['id', 'name', 'diagnosis', 'lastVisit'];
  searchValue: string = '';
  constructor(private snackBar: MatSnackBar, private dummyDataService: DummyDataService,
    private router: Router, private route: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef, private http: HttpClient,private dataService: DataService, public readonly keycloak: KeycloakService) { }

 async ngOnInit() {
  const isLoggedIn = await this.keycloak.isLoggedIn();

  if (!isLoggedIn) {
    this.keycloak.login();
  }

    //debugger
    const data = this.dataService.data;
    this.currentChild = data.childRecord;
    this.childId = data.childRecord.id
    this.loadData()
    this.isCardView = sessionStorage.getItem('preferredView') !== 'table';

  }

  ngAfterViewInit() {
    // this.dummyDataService.getMedicalRecords(this.currentChildId).subscribe(data => {
    //   this.medicalRecords = data;
    //   this.paginator.length = data.length;
    //   this.changeDetectorRef.detectChanges(); // Trigger change detection
    //   this.paginator._intl.itemsPerPageLabel = ''; // Now set the paginator label
    // });
    this.loadData()
  }

  loadData(): void {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('size', this.pageSize.toString());
    this.http.get<any>(this.baseUrl + `/api/visit-history/child/${this.childId}`, { params }).pipe(
      catchError((error: any) => {
        //debugger
        console.error('Error Message: ', error);
        this.showErrorNotification(error.error.detail);
        return throwError(error);
      })
    ).subscribe(
      (data: any) => {
        // Perform your action here with the received data
        console.log('Data received:', data);
        if (!data) { return }
        this.medicalRecords = data.content;
        this.totalPages = data['total_pages'];
        this.totalRecords = data['total_elements']
        this.currentPage = data['pageable']['page_number']
        this.pageSize = data['pageable']['page_size']
        // this.dataArray.data = this.cards;

        if (this.paginator) {
          this.paginator.pageIndex = this.currentPage - 1;
          this.paginator.pageSize = this.pageSize;
          this.paginator.length = this.totalRecords;
          this.changeDetectorRef.detectChanges(); // Trigger change detection
        }
      },
      error => {
       // debugger
        this.showErrorNotification(error.error.detail);
      }
    );
  }


  toggleView(isCardView: boolean) {
    // this.isCardView = !this.isCardView;
    this.isCardView = isCardView;
    // Store the preference in sessionStorage
    sessionStorage.setItem('preferredView', this.isCardView ? 'card' : 'table');
  }


  viewChildDetails(childId: number) {
    // Implementation to view child details
    // Could involve navigating to a new route or opening a modal
    console.log('Navigating to details for child:', childId);
    this.currentChildId = childId;
    this.dummyDataService.getMedicalRecords(childId).subscribe(medicalRecords => {
      this.medicalRecords = medicalRecords;
    })

  }

  // In doctors-dashboard.component.ts

  applyFilter(searchValue: string) {
    this.searchValue = searchValue
    // Here you will call your service function to filter the child records
    // Since we are using a dummy service, we just filter the local data for now
    // this.childRecords = this.dummyDataService.filterChildren(searchValue);
    this.loadData();
  }
  onPageEvent(event: any) {
    // Here you will call your service function to get the data for the current page
    // This would be replaced with an API call in a real scenario
    this.loadData();
  }

  prevPage(): void {

    this.currentPage--;
    this.loadData();

  }

  nextPage(): void {
    this.currentPage++;
    this.loadData();
  }

  pageEvent(event: any): void {
    // debugger
    // Page size changed
    if (event.pageSize !== this.pageSize) {
      this.pageSizeChanged(event);
    }
    // Next page
    else if (event.pageIndex > event.previousPageIndex) {
      this.nextPage();
    }
    // Previous page
    else if (event.pageIndex < event.previousPageIndex) {
      this.prevPage();
    }
  }

  pageSizeChanged(event: any): void {
    this.pageSize = event.pageSize;
    this.currentPage = 0;  // Reset to the first page when changing page size
    this.loadData();
  }

  editChild(){
    this.dataService.setData({childRecord: this.currentChild});
    this.router.navigate(['/secretary']);
  }
  
  addChildVisitHandler() {
    this.dataService.setData({childRecord: this.currentChild});
    this.router.navigate(['/medical-edits']);
  }
  // Helper method to show success notification
  private showSuccessNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000, // Duration in milliseconds
      horizontalPosition: 'start', // Display the snackbar at the start (left) of the screen
      verticalPosition: 'top', // Display the snackbar at the top of the screen
      panelClass: ['success-snackbar'] // You can define your own CSS class for styling
    });
  }

  // Helper method to show error notification
  private showErrorNotification(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 10000, // Duration in milliseconds
      horizontalPosition: 'start', // Display the snackbar at the start (left) of the screen
      verticalPosition: 'top', // Display the snackbar at the top of the screen
      panelClass: ['error-snackbar'] // You can define your own CSS class for styling
    });
  }
}