import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { FileService } from '../services/file.service';
// import * as $ from 'jquery';

declare let $: any;

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.css'],
})
export class UploadImageComponent implements OnInit {
  imageSrc = '';

  fileUploadForm = new FormGroup({
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required]),
  });

  get formControls() {
    return this.fileUploadForm.controls;
  }
  constructor(private fileService: FileService) {}

  ngOnInit(): void {}
  fileName = '';

  isGetClassificationClicked = false;

  warnOnIncorrectImageTypeUpload(message: any) {
    $('.alert').addClass('show');
    $('.alert').append(`<strong>Error!</strong>&nbsp;${message}`);
    $('.alert').alert();
  }

  closeAndResetSweetAlert() {
    $('.alert').removeClass('show');
    $('.alert').text('');
  }

  onFileChange(event: any) {
    const reader = new FileReader();
    this.classificationLabel = '';
    this.probability = 0;
    const file = event.target.files[0];

    if (this.validateImageFile(file.name)) {
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
      };

      this.fileUploadForm.patchValue({
        file: event.target.files[0],
      });
      this.fileName = file.name;
    } else {
      this.warnOnIncorrectImageTypeUpload('Invalid file format');
      this.resetForm();
    }
  }
  classificationLabel = '';
  probability = 0;
  uploadImage() {
    this.isGetClassificationClicked = true;
    const formData = new FormData();
    if (!this.fileUploadForm.invalid) {
      formData.append(
        'image',
        this.fileUploadForm.get('file')?.value!,
        this.fileName
      );
      this.fileService.uploadFile(formData).subscribe({
        next: (data) => {
          console.log(data);
          this.classificationLabel = data.classification_label;
          this.probability = Number(
            (Number(data.probability) * 100).toFixed(2)
          );
          this.isGetClassificationClicked = false;
        },
        error: (e) => {},
        complete: () => {},
      });
    }
  }

  resetForm() {
    this.fileUploadForm.reset();
    setTimeout(this.closeAndResetSweetAlert, 3000);
  }

  validateImageFile(name: String) {
    let extension = name.substring(name.lastIndexOf('.') + 1);
    if (
      extension.toLowerCase() == 'png' ||
      extension.toLowerCase() == 'jpg' ||
      extension.toLowerCase() == 'jpeg'
    ) {
      return true;
    } else {
      return false;
    }
  }
}
