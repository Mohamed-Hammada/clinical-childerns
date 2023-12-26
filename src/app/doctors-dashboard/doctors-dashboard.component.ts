import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { DummyDataService } from '../services/dummy-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { of, Observable, map ,tap} from 'rxjs';
import { DataService } from '../services/DataService';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KeycloakService } from 'keycloak-angular';
import { NotificationService } from '../services/notification.service';
@Component({
  selector: 'app-doctors-dashboard',
  templateUrl: './doctors-dashboard.component.html',
  styleUrls: ['./doctors-dashboard.component.css']
})
export class DoctorsDashboardComponent implements OnInit, AfterViewInit {

  currentPage: number = 0;
  totalPages: number = -1;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20, 50, 100, 200, 500];
  totalRecords: number = -1;
  private baseUrl = environment.beUrl;
  childRecords: any[] = [];
  searchValue:string='';
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  isCardView: boolean = true; // Default to card view
  displayedColumns: string[] = ['id', 'name', 'diagnosis', 'lastVisit'];
  @Output() selectChild = new EventEmitter<number>();
  constructor(private notificationService: NotificationService, public readonly keycloak: KeycloakService,
    private changeDetectorRef: ChangeDetectorRef, private router: Router, private http: HttpClient,private dataService: DataService) { }

  ngOnInit() {
    this.keycloak.isLoggedIn().then((isLoggedIn) => {
      if (!isLoggedIn) {
        this.keycloak.login();
      }
    });
  
    this.isCardView = sessionStorage.getItem('preferredView') !== 'table';
    this.loadData();

  }

  ngAfterViewInit() {
    // this.dummyDataService.getChildRecords().subscribe(data => {
    //   this.childRecords = data;
    //   this.paginator.length = data.length;
    //   this.changeDetectorRef.detectChanges(); // Trigger change detection
    //   this.paginator._intl.itemsPerPageLabel = ''; // Now set the paginator label
    // });
    this.loadData();
  }

  loadData(): void {
    const params = new HttpParams()
      .set('page', this.currentPage.toString())
      .set('size', this.pageSize.toString())
      .set('term', this.searchValue?.toString() || '');
  
    this.http.get<any>(this.baseUrl + "/api/child/children", { params })
      .pipe(
        catchError(this.handleChildDataError),
        tap(this.handleChildDataSuccess)
      )
      .subscribe();
  }
  
  private handleChildDataSuccess = (data: any): void => {
    console.log('Data received:', data);
    if (!data) { return; }
    if (!data.content) { return; }
    this.childRecords = data.content;
    this.totalPages = data['total_pages'];
    this.totalRecords = data['total_elements']
    this.currentPage = data['pageable']['page_number']
    this.pageSize = data['pageable']['page_size']
  
    if (this.paginator) {
      this.paginator.pageIndex = this.currentPage - 1;
      this.paginator.pageSize = this.pageSize;
      this.paginator.length = this.totalRecords;
      this.changeDetectorRef.detectChanges(); // Trigger change detection
    }
  };
  
  private handleChildDataError = async (error: any): Promise<any> => {
    const isLoggedIn = await this.keycloak.isLoggedIn();

    if (!isLoggedIn) {
      this.keycloak.login();
    }
    console.error('Error Message: ', error);
    this.notificationService.showErrorNotification(error.error?.detail);
    return throwError(error);
  };
  



  toggleView(isCardView: boolean) {
    // this.isCardView = !this.isCardView;
    this.isCardView = isCardView;
    // Store the preference in sessionStorage
    sessionStorage.setItem('preferredView', this.isCardView ? 'card' : 'table');
  }


  viewChildDetails(child: any) {
    // Implementation to view child details
    // Could involve navigating to a new route or opening a modal
    // debugger
    console.log('Navigating to details for child:', child.name);
    this.dataService.setData({  childRecord: child });
    this.selectChild.emit(child.id);
    this.router.navigate(['/child-history',child.id]);
  }

  addChildHandler() {
    this.dataService.setData({ });
    // secretary
    this.router.navigate(['/secretary']);
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
    // this.childRecords = this.dummyDataService.getChildrenByPage(event.pageIndex, event.pageSize);
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

}
