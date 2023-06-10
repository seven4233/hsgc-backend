import { ArgumentsHost,  Catch, ExceptionFilter, HttpException } from "@nestjs/common";
import {Request, Response} from 'express'

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
    catch(exception: HttpException,  host: ArgumentsHost) {

        let message;

        if(typeof exception.getResponse() === 'object'){
          let errRes:any = exception.getResponse()
          if(Array.isArray(errRes.message)){
            message = errRes.message.pop()
          }else {
           message = errRes.message
          }
        }else {
          message = exception.getResponse()
        }
        
        const ctx = host.switchToHttp()
        const request = ctx.getRequest<Request>()
        const response = ctx.getResponse<Response>()
        const status = exception.getStatus()

        response.status(status).json({
          status,
          message,
          path: request.url, 
          time: new Date(),
        })
    }
}