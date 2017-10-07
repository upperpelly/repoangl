import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


export class customvalidations {

    public static OneValidator(group: FormGroup): { [key: string]: any } {
        let isAtLeastOne = false;
        if (group && group.controls) {
            for (const control in group.controls) {
                if (group.controls.hasOwnProperty(control) && group.controls[control].valid && group.controls[control].value) {
                    isAtLeastOne = true;
                    break;
                }
            }
        }
        return isAtLeastOne ? null : { 'required': true };
    }
}
