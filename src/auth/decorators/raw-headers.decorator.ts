import { ExecutionContext, InternalServerErrorException, createParamDecorator } from "@nestjs/common"

export const RawHeader = createParamDecorator(
    ( data, ctx: ExecutionContext ) => {

        const req = ctx.switchToHttp().getRequest();
        return  req.rawHeaders;
    }
);