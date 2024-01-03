import { Component } from '@angular/core';
import {NgForm} from '@angular/forms';
import {IssueService} from '../issue-service.service';
@Component({
  selector: 'app-issue-create',
  templateUrl: './issue-create.component.html',
  styleUrls: ['./issue-create.component.css']
})
export class IssueCreateComponent {
  constructor(public issueService: IssueService) {
  }
  status: string = 'Open';

  //add issue
  onAddIssue(issueForm: NgForm) {
    if (issueForm.invalid) {
      alert('Make sure you fill in all fields');
      return;
    }
    alert(issueForm.value.enteredTitle + ':' + issueForm.value.enteredStatus);

    this.issueService.addIssueService(issueForm.value.enteredTitle, issueForm.value.enteredDescription, issueForm.value.enteredStatus);
    issueForm.resetForm();
  }
}
