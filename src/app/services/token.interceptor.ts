import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { AuthService } from "./auth.service";
import { ContextService } from "./context.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor{

  constructor(
    private auth: AuthService, 
    private router: Router, 
    private contextService: ContextService) {  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.auth.isAuthenticated()){
      console.log(`REQUEST: ${req.url}`);
      if (req.url != this.contextService.privatBankAPI) {
        req = req.clone({
          setHeaders:{ Authorization: this.auth.getToken() }
        })
      }
    }
     return next.handle(req).pipe(
      catchError(
        (error: HttpErrorResponse) => this.handleAuthError(error)
      )
    ) 
  }

  private handleAuthError(error: HttpErrorResponse): Observable<any> {
    if (error.status === 401) {
      this.router.navigate(['/'], {
        queryParams: {
          sessionFailed: true
        }
      })
    }

    return throwError(error)
  }


}
