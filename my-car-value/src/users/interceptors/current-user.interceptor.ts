import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UsersService } from "../users.service";

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private usersService: UsersService) { }

    async intercept(context: ExecutionContext, handler: CallHandler) {
        //request
        const request = context.switchToHttp().getRequest()
        const { userId } = request.session || {};

        // checking if there is session.
        if (userId) {
            const user = await this.usersService.findOne(userId);
            request.currentUser = user;
        }

        return handler.handle();
    }
}

// ! The Admin Guard checks the currentUser property, but since the Current User Interceptor hasn’t run yet, currentUser is undefined, causing errors.
// $ To resolve this issue, we need to ensure that the `currentUser` property is set *before* the Admin Guard executes. This is achieved by converting the **Current User Interceptor** into middleware.
// $ Register it as a **global middleware** so it applies to all incoming requests.