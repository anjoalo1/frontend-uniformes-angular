import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators  } from "@angular/forms";

export class AppBaseComponent{

    public isTouchedField = (form: FormGroup, field: string): boolean=>{

        /* if(form.get(field) !== null){
            let isTrue:boolean;
            isTrue = form?.get(field)?.touched === true && form?.get(field)?.invalid;
            return isTrue;
        }
        else {
            return false;
        } */
        //return form.get(field) != null && form.get(field)?.touched === true && form.get(field)?.invalid;

        const control = form.get(field);
        return control != null && control.touched === true && control.invalid;
    }
}