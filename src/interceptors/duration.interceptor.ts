import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";

@Injectable()
export class DurationInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const dateIn = Date.now();
    console.log(`Request Created at ${dateIn}`);
    return next.handle().pipe(
      tap(() => {
        const dateOut = Date.now();
        console.log(`Request Ended at ${dateOut}`);
      })
    );
  }
}
