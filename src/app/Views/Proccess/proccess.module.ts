import { NgModule } from "@angular/core";

import { SharedModule } from '../Shared/shared.module';

import { ProccessComponent } from './proccess.component';

import { DecodingComponent } from './decoding/decoding.component';

//Routes
import { ProccessRoutesModule } from './proccess.routes';

@NgModule({
    imports:[
        SharedModule,
        ProccessRoutesModule
    ],
    declarations:[
        ProccessComponent,
        DecodingComponent
    ],
    exports:[
        DecodingComponent
    ]
})

export class ProccessModule{
    
}