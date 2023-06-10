import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";


import { Observable, map } from "rxjs";

interface IResponse<T> {
    result?: T
}

@Injectable()
export class Response<T> implements NestInterceptor {
    intercept(context:ExecutionContext , next: CallHandler): Observable<IResponse<T>>{
        return next.handle().pipe(map(data => {
            if(typeof data === 'string'){
                return {
                    status: 0,
                    message:data,
                }        
            }else {
                return {
                    status: 0,
                    message: data?.message || 'ok',
                    result: data?.data,
                } 
            }
        }))
    }
}