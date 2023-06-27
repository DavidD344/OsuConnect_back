
import { CanActivate, ExecutionContext, mixin, PreconditionFailedException, Type } from '@nestjs/common';
import { AuthRequest } from '../models/AuthRequest';
// import RequestWithUser from '../authentication/requestWithUser.interface';

const RoleGuard = (role: string[]): Type<CanActivate> => {

  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<AuthRequest>();
      const user = request.user; //preciso ter o user apenas

      // console.log(user?.role.includes(role))
      console.log(user.role, role)

      if (!user) {
        throw new PreconditionFailedException('É necessário estar autenticado!')
      }

      return role.includes(user.role);//true or false



    }
  }

  return mixin(RoleGuardMixin);
}

export default RoleGuard;
