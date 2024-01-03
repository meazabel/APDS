import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs";
import {IssueService} from "../issue-service.service";
import {NgModel} from "@angular/forms";

@Component({
  selector: 'app-issue-display',
  templateUrl: './issue-display.component.html',
  styleUrls: ['./issue-display.component.css']
})
export class IssueDisplayComponent implements OnInit{
  issues:{_id: string, title: string, description: string, status: string, _v: string}[] = [];

  constructor(public issueService:IssueService) { }

  private issueSubscription!: Subscription;

  ngOnInit() {
    this.issueService.getIssuesService();
    this.issueSubscription = this.issueService.getUpdateListener()
      .subscribe((issues:{_id: string, title: string, description: string, status: string, _v: string}[]) => {
        this.issues = issues;
      });
  }

  ngOnDestroy() {
    this.issueSubscription.unsubscribe();
  }
  // This function is used to delete the issue
  onDelete(issueId:string){
    this.issueService.deleteIssueService(issueId);
    alert('Issue deleted successfully!')
  }

  // This function is used to update the status of the issue
  onEdit(issueId: string, status: NgModel){
    const updatedStatus = status.value;
    this.issueService.updateIssueService(issueId, updatedStatus);
    alert('Issue updated successfully! Please refresh the page to see the changes.')
  }
}
