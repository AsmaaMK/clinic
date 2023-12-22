import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
  ViewChildren,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { FormManage } from '../../classes/form-manage';
import { RecordsService } from '../../services/records.service';
import { Record } from '../../models/record.model';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../toaster/toaster.service';
import { DatePipe, NgClass, NgIf } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { LoadingDirective } from '../../directives/loading.directive';

@Component({
  selector: 'app-record-popup',
  standalone: true,
  imports: [
    NgIf,
    NgClass,
    TranslateModule,
    LoadingDirective,
    ReactiveFormsModule,
  ],
  providers: [DatePipe],
  templateUrl: './record-popup.component.html',
  styleUrl: './record-popup.component.scss',
})
export class RecordPopupComponent
  extends FormManage
  implements AfterViewInit, OnChanges
{
  /**
   * required
   * */
  @Input() createOrUpdate!: 'create' | 'update';

  /**
   * required if createOrUpdate = 'update'
   */
  @Input() record!: Record | null;

  /**
   * required if createOrUpdate = 'create'
   */
  @Input() patientId!: string | null;

  /**
   * required (two way binding)
   * */
  @Input() show = false;
  @Output() showChange = new EventEmitter<boolean>();

  @ViewChild('recordPopupContainer') recordPopupContainer!: ElementRef;

  loading = false;
  recordForm!: FormGroup;
  doctorId!: string;

  constructor(
    private recordsService: RecordsService,
    private authService: AuthService,
    private toaster: ToasterService,
    private datePipe: DatePipe
  ) {
    super();
  }

  ngAfterViewInit() {
    this.recordPopupContainer?.nativeElement.classList.add('-z-10');
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['show'] &&
      changes['show'].currentValue &&
      this.recordPopupContainer
    ) {
      this.initRecordForm();
      this.doctorId = this.authService.getUserDataFormStorage()._id;

      this.recordPopupContainer?.nativeElement.classList.replace(
        '-z-10',
        'z-10'
      );
    } else if (!changes['show'].currentValue) {
      // waite for 400ms to set the class -z-10 to close the popup with animation
      setTimeout(() => {
        this.recordPopupContainer?.nativeElement.classList.replace(
          'z-10',
          '-z-10'
        );
      }, 400);
    }
  }

  initRecordForm() {
    this.recordForm = new FormGroup({
      notes: new FormControl(
        this.createOrUpdate === 'create' ? '' : this.record?.notes,
        Validators.required
      ),
      sessionDate: new FormControl(
        this.createOrUpdate === 'create'
          ? ''
          : this.formatDate(this.record?.sessionDate!!),
        Validators.required
      ),
      treatment: new FormControl(
        this.createOrUpdate === 'create' ? '' : this.record?.treatment,
        Validators.required
      ),
    });

    this.setForm(this.recordForm);
  }

  onSubmit() {
    if (this.isFormValid) {
      this.createOrUpdate === 'create'
        ? this.createRecord()
        : this.updateRecord();
    } else this.markAllFeildsTouched();
  }

  createRecord() {
    if (this.isFormValid) {
      this.loading = true;
      this.recordsService
        .createRecord(
          this.doctorId,
          this.patientId!!,
          this.FormValue.notes,
          this.FormValue.sessionDate,
          this.FormValue.treatment
        )
        .subscribe({
          next: () => {
            this.closePopup();
            this.toaster.showToast('Record created successfully.', 'success');
          },
          error: (err) => {
            this.loading = false;
            this.toaster.showToast(err, 'error');
          },
        });
    }
  }

  updateRecord() {
    if (this.isFormValid) {
      this.loading = true;
      this.recordsService
        .updateRecord(
          this.record?.patientId._id!!,
          this.FormValue.notes,
          this.FormValue.sessionDate,
          this.FormValue.treatment
        )
        .subscribe({
          next: () => {
            this.closePopup();
            this.toaster.showToast('Record updated successfully.', 'success');
          },
          error: (err) => {
            this.loading = false;
            this.toaster.showToast(err, 'error');
          },
        });
    }
  }

  closePopup() {
    this.show = false;
    this.record = null;
    this.loading = false;
    this.resetForm();
    this.showChange.next(this.show);
  }

  // Helper function to format date using DatePipe
  private formatDate(date: Date): string {
    return this.datePipe.transform(date, 'yyyy-MM-dd') || '';
  }
}
