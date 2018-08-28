import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable()
export class APIInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let apiReq;
        if (req.url.includes('i18n')) {
            apiReq = req;
        } else {
            apiReq = req.clone({
                url: `${environment.apiUrl}${req.url}`
            });
        }
        return next.handle(apiReq);
    }
}
