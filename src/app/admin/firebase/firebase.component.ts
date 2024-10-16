import { Component } from '@angular/core';

interface TableItem {
  projectId: number;
  tokenKey: string;
  bucketName: string;
  fileJson: string;
  switchValue: boolean;
}

@Component({
  selector: 'app-firebase',
  templateUrl: './firebase.component.html',
  styleUrls: ['./firebase.component.scss']
})
export class FirebaseComponent {
  title: string = "Quản lý tính Firebase";
  currentPage: string = "Firebase";

  switchData: TableItem[] = [{ projectId: 1, tokenKey: '', bucketName: '', fileJson: '', switchValue: false },
    { projectId: 2, tokenKey: '', bucketName: '', fileJson: '', switchValue: false },
    { projectId: 3, tokenKey: '', bucketName: '', fileJson: '', switchValue: false },
    { projectId: 4, tokenKey: '', bucketName: '', fileJson: '', switchValue: false },
    { projectId: 5, tokenKey: '', bucketName: '', fileJson: '', switchValue: false }
  ];

  onSwitchChange(value: boolean, index: number) {
    this.switchData.forEach((item, i) => {
      if (i !== index) {
        item.switchValue = false;
      }
    });
  }

}
