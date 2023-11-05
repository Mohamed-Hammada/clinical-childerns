// In dummy-data.service.ts
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DummyDataService {
  // Dummy data array simulating data you might get from an API
  private childData = [
    { 
      id: 1, 
      name: 'John Doe', 
      ageYears: 8, 
      ageDays: 245, 
      lastVisit: '2023-04-01', 
      daysSinceLastVisit: 3, 
      latestDiagnosis: 'Flu' 
    },
    { 
      id: 2, 
      name: 'Alice Smith', 
      ageYears: 6, 
      ageDays: 192, 
      lastVisit: '2023-03-15', 
      daysSinceLastVisit: 19, 
      latestDiagnosis: 'Common Cold' 
    },
    { 
      id: 3, 
      name: 'Emma Johnson', 
      ageYears: 4, 
      ageDays: 142, 
      lastVisit: '2023-04-10', 
      daysSinceLastVisit: 2, 
      latestDiagnosis: 'Allergies' 
    },
    { 
      id: 4, 
      name: 'William Brown', 
      ageYears: 7, 
      ageDays: 236, 
      lastVisit: '2023-03-28', 
      daysSinceLastVisit: 14, 
      latestDiagnosis: 'Stomachache' 
    },
    { 
      id: 5, 
      name: 'Olivia Lee', 
      ageYears: 5, 
      ageDays: 179, 
      lastVisit: '2023-04-05', 
      daysSinceLastVisit: 6, 
      latestDiagnosis: 'Fever' 
    },
    { 
      id: 6, 
      name: 'James Wilson', 
      ageYears: 4, 
      ageDays: 137, 
      lastVisit: '2023-03-20', 
      daysSinceLastVisit: 22, 
      latestDiagnosis: 'Ear Infection' 
    },
    { 
      id: 7, 
      name: 'Sophia Miller', 
      ageYears: 3, 
      ageDays: 120, 
      lastVisit: '2023-03-10', 
      daysSinceLastVisit: 32, 
      latestDiagnosis: 'Asthma' 
    },
    { 
      id: 8, 
      name: 'Liam Harris', 
      ageYears: 8, 
      ageDays: 252, 
      lastVisit: '2023-03-25', 
      daysSinceLastVisit: 17, 
      latestDiagnosis: 'Bronchitis' 
    },
    { 
      id: 9, 
      name: 'Charlotte Martin', 
      ageYears: 6, 
      ageDays: 192, 
      lastVisit: '2023-03-19', 
      daysSinceLastVisit: 23, 
      latestDiagnosis: 'Influenza' 
    },
    { 
      id: 10, 
      name: 'Noah Anderson', 
      ageYears: 4, 
      ageDays: 143, 
      lastVisit: '2023-03-22', 
      daysSinceLastVisit: 20, 
      latestDiagnosis: 'Chickenpox' 
    },
    { 
      id: 11, 
      name: 'Ava Taylor', 
      ageYears: 7, 
      ageDays: 229, 
      lastVisit: '2023-04-02', 
      daysSinceLastVisit: 2, 
      latestDiagnosis: 'Cough' 
    },
    { 
      id: 12, 
      name: 'Mason Lewis', 
      ageYears: 6, 
      ageDays: 186, 
      lastVisit: '2023-03-14', 
      daysSinceLastVisit: 28, 
      latestDiagnosis: 'Sore Throat' 
    },
    { 
      id: 13, 
      name: 'Oliver Moore', 
      ageYears: 4, 
      ageDays: 159, 
      lastVisit: '2023-03-29', 
      daysSinceLastVisit: 13, 
      latestDiagnosis: 'Rash' 
    },
    { 
      id: 14, 
      name: 'Amelia Wilson', 
      ageYears: 5, 
      ageDays: 177, 
      lastVisit: '2023-03-23', 
      daysSinceLastVisit: 19, 
      latestDiagnosis: 'Headache' 
    },
    { 
      id: 15, 
      name: 'Ethan Turner', 
      ageYears: 3, 
      ageDays: 114, 
      lastVisit: '2023-03-30', 
      daysSinceLastVisit: 2, 
      latestDiagnosis: 'Vomiting' 
    },
  ];
  


  constructor() { }

  // Function to simulate an API call to get child records
  getChildRecords(): Observable<any[]> {
    return of(this.childData);
  }

  filterChildren(searchValue: string): any[] {
    return this.childData.filter(child =>
      child.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  }

  getChildrenByPage(pageIndex: number, pageSize: number): any[] {
    const startIndex = pageIndex * pageSize;
    return this.childData.slice(startIndex, startIndex + pageSize);
  }

}
