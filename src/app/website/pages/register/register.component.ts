import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { OnExit } from '../../../guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  onExit(): boolean | Observable<boolean> | Promise<boolean> {
    return confirm('¿Estas seguro que deseas salir?');
  }


}
