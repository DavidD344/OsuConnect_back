
import { CanActivate, ExecutionContext, mixin, Type } from '@nestjs/common';
import Role from '../roles/auth.role';
// import RequestWithUser from '../authentication/requestWithUser.interface';

const UserGuard = (role: Role): Type<CanActivate> => {

  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const request = context.switchToHttp().getRequest<any>();
      const user = request.user; //preciso ter o user apenas

      // console.log(user?.role.includes(role))
      console.log(user.role, role)

      return user



    }
  }

  return mixin(RoleGuardMixin);
}

export default UserGuard;
