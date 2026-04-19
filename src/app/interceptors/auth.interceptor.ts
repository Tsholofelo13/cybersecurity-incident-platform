import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    
    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(cloned);
    }
  }
  
  return next(req);
};
