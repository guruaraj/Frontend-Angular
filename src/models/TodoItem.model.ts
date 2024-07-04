import { FormGroupDirective } from "@angular/forms";
import { Guid } from "guid-typescript";

    export class TodoItem {
        id: string;
        description: string;
        IsCompleted: boolean;
    }