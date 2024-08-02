import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class VerifySelfOrAdminGuard implements CanActivate {
    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean>  {
        const request = context.switchToHttp().getRequest();
        const user = request.user;
        const userIdToVerify = parseInt(request.params.userId);

        if(isNaN(userIdToVerify)) return false;

        const userRoles = user.userRoles || [];
        const isAdmin = userRoles.some(role => role.role.name === 'admin');
        const isSelf = user.id === userIdToVerify;
        
        if (!isAdmin && !isSelf) return false;
    
        return true;
    }
}