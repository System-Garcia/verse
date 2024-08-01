import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        
        const request = context.switchToHttp().getRequest();
        const user = request.user;

        const { userRoles = [] } = user;

        const isAdmin = userRoles.some(role => role.role.name === 'admin');
        
        if (!isAdmin) return false;

        return true;
    }
}