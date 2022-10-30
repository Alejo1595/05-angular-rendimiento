import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpContext, HttpContextToken } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

const check_time = new HttpContextToken<boolean>(() => false);

export const checkTime = () => new HttpContext().set(check_time, true);

@Injectable()
export class TimeInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.context.get(check_time)) return next.handle(request);

    const start = performance.now();

    return next.handle(request).pipe(
      tap(() => {
        const time = (performance.now() - start) + 'ms';
        console.log({ url: request.url, time })
      })
    );

  }
}
