import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef , Input } from '@angular/core';
import { DummyDataService } from '../services/dummy-data.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-child-history',
  templateUrl: './child-history.component.html',
  styleUrls: ['./child-history.component.css']
})
export class ChildHistoryComponent {

  currentPage: number = 1;
  totalPages: number = -1;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5,10,15,20,50,100,200,500];
  totalRecords: number = -1;
 
  medicalRecords: any[] = [];
  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort!: MatSort;
  isCardView: boolean = true; // Default to card view
  displayedColumns: string[] = ['id', 'name', 'diagnosis', 'lastVisit'];

  constructor(private dummyDataService: DummyDataService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit() {
 
    this.isCardView = sessionStorage.getItem('preferredView') !== 'table';

  }

  ngAfterViewInit() {
    this.dummyDataService.getMedicalRecords().subscribe(data => {
      this.medicalRecords = data;
      this.paginator.length = data.length;
      this.changeDetectorRef.detectChanges(); // Trigger change detection
      this.paginator._intl.itemsPerPageLabel = ''; // Now set the paginator label
    });
  }

  loadData(): void {
  
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

  }

  // In doctors-dashboard.component.ts

  applyFilter(searchValue: string) {
    // Here you will call your service function to filter the child records
    // Since we are using a dummy service, we just filter the local data for now
    this.medicalRecords = this.dummyDataService.filterChildren(searchValue);
  }
  onPageEvent(event:any) {
    // Here you will call your service function to get the data for the current page
    // This would be replaced with an API call in a real scenario
    this.medicalRecords = this.dummyDataService.getChildrenByPage(event.pageIndex, event.pageSize);
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
    debugger
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
    this.currentPage = 1;  // Reset to the first page when changing page size
    this.loadData();
  }
}
