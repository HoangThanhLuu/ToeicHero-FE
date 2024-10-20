import {Component, OnInit} from '@angular/core';

interface ItemData {
  id: string;
  host: string;
  port: string;
  username: string;
  password: string;
  status: string;
  k: string;
}

@Component({
  selector: 'app-email',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss']
})
export class EmailComponent implements OnInit {
  title: string = "Quản lý email";
  currentPage: string = "Email";

  editCache: { [key: string]: { edit: boolean; data: ItemData } } = {};
  listOfData: ItemData[] = [];

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfData[index] },
      edit: false
    };
  }

  saveEdit(id: string): void {
    const index = this.listOfData.findIndex(item => item.id === id);
    Object.assign(this.listOfData[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.listOfData.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
  }

  ngOnInit(): void {
    const data = [];
    for (let i = 0; i < 100; i++) {
      const item: ItemData = {
        host: `8080`,
        id: `${i}`,
        port: `300`,
        username: ``,
        password: `12345678`,
        status: `active`,
        k: ``
      }
      data.push(item);
    }
    this.listOfData = data;
    this.updateEditCache();
  }
}
