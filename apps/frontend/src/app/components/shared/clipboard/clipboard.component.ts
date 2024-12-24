import { Component, Input } from '@angular/core';
import { MessageService } from '../../../services/message.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCopy, IconDefinition } from '@fortawesome/free-solid-svg-icons';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-clipboard',
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './clipboard.component.html',
})
export class ClipboardComponent {
  @Input() label: string = '';
  @Input() text: string = '';
  @Input() observation: string = '';
  @Input() icon?: IconDefinition;
  faCopy = faCopy;
  constructor(private readonly message: MessageService) {}

  textCopy() {
    navigator.clipboard.writeText(this.text);
    this.message.success('Texto copiado com sucesso!');
  }
}
