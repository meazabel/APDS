import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Subject} from "rxjs";
import {NgModel} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private issuesDisplay: { _id: string, title: string, description: string, status: string, _v: string }[] = [];
  private updatedIssuesDisplay = new Subject<{
    _id: string,
    title: string,
    description: string,
    status: string,
    _v: string
  }[]>();

  constructor(private http: HttpClient) {
  }

  //add new issue
  addIssueService(pTitle: string, pDescription: string, pStatus: string) {
    this.http.post<{ message: string, issue: any }>('https://localhost:3000/api/issues/add-issue', {
      title: pTitle,
      description: pDescription,
      status: pStatus
    })
      .subscribe((theIssue) => {
        this.issuesDisplay.push(theIssue.issue);
        this.updatedIssuesDisplay.next([...this.issuesDisplay]);
      });
  }

  //get all issues
  getIssuesService() {
    this.http.get<{ message: string, issues: any }>('https://localhost:3000/api/issues/all-issues')
      .subscribe((theIssue) => {
        this.issuesDisplay = theIssue.issues;
        this.updatedIssuesDisplay.next([...this.issuesDisplay]);
      })
  }

  //delete issue
  deleteIssueService(issueId: string) {
    this.http.delete('https://localhost:3000/api/issues/delete-issue/' + issueId)
      .subscribe(() => {
        this.issuesDisplay = this.issuesDisplay.filter(issue => issue._id !== issueId);
        this.updatedIssuesDisplay.next([...this.issuesDisplay]);
      });
  }

  //update issue status
  updateIssueService(issueId: string, status: string) {
    this.http.put('https://localhost:3000/api/issues/update-issue/' + issueId, {status: status})
      .subscribe((theIssue) => {
        this.issuesDisplay = this.issuesDisplay.filter(issue => issue._id !== issueId);
        this.updatedIssuesDisplay.next([...this.issuesDisplay]);
      });
  }

  //get updated issues
  getUpdateListener() {
    return this.updatedIssuesDisplay.asObservable();
  }
}
