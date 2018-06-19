import { Component } from '@angular/core';

@Component({
  selector: 'app-empty-state',
  template: `
    <div class="empty-state" >
      <i class="material-icons">face</i>
      <p>
        Selecione um currículo para visualizar todas as informações do candidato!
      </p>
    </div>`,
  styleUrls: ['./empty-state.scss']
})
export class EmptyStateComponent { }
