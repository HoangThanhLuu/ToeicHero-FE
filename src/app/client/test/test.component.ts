import {
  Component,
  OnInit
} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {HttpClient} from "@angular/common/http";
import {BsModalService} from "ngx-bootstrap/modal";
import {NgxSpinnerService} from "ngx-spinner";
import {
  ActivatedRoute,
  Router
} from "@angular/router";
import {finalize} from "rxjs";
import {LoginComponent} from "../login/login.component";
import {ProfileService} from '../../common/profile.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {
  currentExam: any;
  allChecked = false;
  indeterminate = true;
  checkOptionsOne = [
    {label: 'Part 1 (6 câu hỏi)', value: 'PART1', checked: false},
    {label: 'Part 2 (25 câu hỏi)', value: 'PART2', checked: false},
    {label: 'Part 3 (39 câu hỏi)', value: 'PART3', checked: false},
    {label: 'Part 4 (30 câu hỏi)', value: 'PART4', checked: false},
    {label: 'Part 5 (30 câu hỏi)', value: 'PART5', checked: false},
    {label: 'Part 6 (16 câu hỏi)', value: 'PART6', checked: false},
    {label: 'Part 7 (54 câu hỏi)', value: 'PART7', checked: false},
  ];

  listTagPart1 = [
    '[Part 1] Tranh tả người',
    '[Part 1] Tranh tả đồ vật',
    '[Part 1] Tranh tả cả người và vật',
  ]
  listTagPart2 = [
    '[Part 2] Câu hỏi WHAT',
    '[Part 2] Câu hỏi WHO',
    '[Part 2] Câu hỏi WHERE',
    '[Part 2] Câu hỏi WHEN',
    '[Part 2] Câu hỏi HOW',
    '[Part 2] Câu hỏi WHY',
    '[Part 2] Câu hỏi WHICH',
    '[Part 2] Câu hỏi YES/NO',
    '[Part 2] Câu hỏi đuôi',
    '[Part 2] Câu hỏi lựa chọn',
    '[Part 2] Câu yêu cầu, đề nghị',
    '[Part 2] Câu trần thuật',
  ]
  listTagPart3 = [
    '[Part 3] Câu hỏi về chủ đề, mục đích',
    '[Part 3] Câu hỏi về danh tính người nói',
    '[Part 3] Câu hỏi về chi tiết cuộc hội thoại',
    '[Part 3] Câu hỏi về hành động tương lai',
    '[Part 3] Câu hỏi kết hợp bảng biểu',
    '[Part 3] Câu hỏi về hàm ý câu nói',
    '[Part 3] Chủ đề: Company - General Office Work',
    '[Part 3] Chủ đề: Company - Personnel',
    '[Part 3] Chủ đề: Company - Business, Marketing',
    '[Part 3] Chủ đề: Company - Event, Project',
    '[Part 3] Chủ đề: Company - Facility',
    '[Part 3] Chủ đề: Shopping, Service',
    '[Part 3] Chủ đề: Order, delivery',
    '[Part 3] Chủ đề: Transportation',
    '[Part 3] Chủ đề: Travel, Hotel',
    '[Part 3] Câu hỏi về địa điểm hội thoại',
    '[Part 3] Câu hỏi về yêu cầu, gợi ý'
  ]
  listTagPart4 = [
    '[Part 4] Câu hỏi về chủ đề, mục đích',
    '[Part 4] Câu hỏi về danh tính, địa điểm',
    'Part 4] Câu hỏi về chi tiết',
    '[Part 4] Câu hỏi về hành động tương lai',
    '[Part 4] Câu hỏi kết hợp bảng biểu',
    '[Part 4] Câu hỏi về hàm ý câu nói',
    '[Part 4] Dạng bài: Telephone message - Tin nhắn thoại',
    '[Part 4] Dạng bài: Advertisement - Quảng cáo',
    '[Part 4] Dạng bài: Announcement - Thông báo',
    'Part 4] Dạng bài: News report, Broadcast - Bản tin',
    '[Part 4] Dạng bài: Talk - Bài phát biểu, diễn văn',
    '[Part 4] Dạng bài: Interview - Phỏng vấn',
    '[Part 4] Dạng bài: Excerpt from a meeting - Trích dẫn từ buổi họp'
  ]
  listTagPart5 = [
    '[Part 5] Câu hỏi từ loại',
    '[Part 5] Câu hỏi ngữ pháp',
    '[Part 5] Câu hỏi từ vựng',
    '[Part 6] Câu hỏi từ vựng',
    '[Grammar] Danh từ',
    '[Grammar] Đại từ',
    '[Grammar] Động từ',
    '[Grammar] Tính từ',
    '[Grammar] Trạng từ',
    '[Grammar] Giới từ',
    '[Grammar] Liên từ',
    '[Grammar] Động từ nguyên mẫu có to',
    '[Grammar] Phân từ và Cấu trúc phân từ',
    '[Grammar] Cấu trúc so sánh'
  ]

  listTagPart6 = [
    '[Part 6] Câu hỏi từ loại',
    '[Part 6] Câu hỏi ngữ pháp',
    '[Part 6] Câu hỏi từ vựng',
    '[Part 6] Câu hỏi điền câu vào đoạn văn',
    '[Part 6] Hình thức: Bài báo (Article/ Review)',
    '[Part 6] Hình thức: Quảng cáo (Advertisement)',
    '[Part 6] Hình thức: Thông báo/ văn bản hướng dẫn (Notice/ Announcement Information)',
    '[Part 6] Hình thức: Thông báo nội bộ (Memo)'
  ]
  listTagPart7 = [
    '[Part 7] Câu hỏi tìm thông tin',
    '[Part 7] Câu hỏi tìm chi tiết sai',
    '[Part 7] Câu hỏi về chủ đề, mục đích',
    '[Part 7] Câu hỏi suy luận',
    '[Part 7] Câu hỏi điền câu',
    '[Part 7] Cấu trúc: một đoạn',
    '[Part 7] Cấu trúc: nhiều đoạn',
    '[Part 7] Dạng bài: Email/ Letter: Thư điện tử/ Thư tay',
    '[Part 7] Dạng bài: Announcement/ Notice: Thông báo',
    '[Part 7] Dạng bài: Instructions: Văn bản hướng dẫn',
    '[Part 7] Dạng bài: List/ Menu: Danh sách/ Thực đơn'
  ]
  colorTag = '#ede7ea';
  data: any[] = [];
  examId: number = 0;

  constructor(private toast: ToastrService,
              private http: HttpClient,
              private bsModalService: BsModalService,
              private spinnerService: NgxSpinnerService,
              private router: Router,
              private route: ActivatedRoute,
              private profileService: ProfileService) {
  }

  ngOnInit(): void {
    // get exam from url
    this.spinnerService.show();
    this.route.params.subscribe(params => {
      this.examId = params['examId'];
      this.http.get(`/api/exam/find-by-id/${this.examId}`)
        .pipe(finalize(() => {
          this.spinnerService.hide();
        }))
        .subscribe((res: any) => {
          if (res?.success) {
            this.currentExam = res?.data;
          } else {
            this.toast.error(res?.message);
            window.location.href = '/list-test';
          }
        });
    });
  }

  updateAllChecked() {
    this.indeterminate = false;
    if (this.allChecked) {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: true
      }));
    } else {
      this.checkOptionsOne = this.checkOptionsOne.map(item => ({
        ...item,
        checked: false
      }));
    }
  }

  updateSingleChecked() {
    if (this.checkOptionsOne.every(item => !item.checked)) {
      this.allChecked = false;
      this.indeterminate = false;
    } else if (this.checkOptionsOne.every(item => item.checked)) {
      this.allChecked = true;
      this.indeterminate = false;
    } else {
      this.indeterminate = true;
    }
  }

  startFullTest() {
    this.spinnerService.show().then();
    this.profileService.getProfileData().subscribe({
      next: profile => {
        this.spinnerService.hide().then();
        if (profile) {
          // window.location.href = `${window.location.href}/start`;
          this.router.navigate([`/test/${this.currentExam?.examId}/start`]).then();
        } else {
          this.showLogin();
        }
      },
      error: () => {
        this.spinnerService.hide().then();
        this.showLogin();
      }
    });
  }

  showLogin() {
    this.toast.error('Vui lòng đăng nhập để thực hiện bài test');
    this.bsModalService.show(LoginComponent, {
      class: 'modal-lg modal-dialog-centered',
      initialState: {
        isNotDirect: true,
        directLink: window.location.href
      }
    });
  }

  startPractice() {
    if (this.checkOptionsOne.filter(item => item.checked).length === 0) {
      this.toast.error('Vui lòng chọn ít nhất 1 part để luyện tập');
      return;
    }
    if (this.allChecked) {
      this.startFullTest();
      return;
    }
    this.spinnerService.show().then();
    this.profileService.getProfileData().subscribe({
      next: (profile) => {
        this.spinnerService.hide().then();
        if (profile) {
          const listPart = this.checkOptionsOne.filter(item => item.checked).map(item => item.value);
          const listPartString = listPart.join(',');
          const routeParams = {
            part: listPartString,
          };
          this.router.navigate([`/test/${this.currentExam?.examId}/practice`], {queryParams: routeParams}).then();
        } else {
          this.showLogin();
        }
      },
      error: _ => {
        this.spinnerService.hide().then();
        this.showLogin();
      }
    });
  }


}
