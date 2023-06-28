import { createParamDecorator, ExecutionContext, InternalServerErrorException } from "@nestjs/common";

export const RawHeaders = createParamDecorator(
  (data, ctx: ExecutionContext)=> {


    console.log({ data });

    const req = ctx.switchToHttp().getRequest();
    return req.rawHeaders

  }
)
