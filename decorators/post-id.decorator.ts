import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const PostId = createParamDecorator(
    (_: unknown, ctx: ExecutionContext): number | null => {
      const request = ctx.switchToHttp().getRequest();
      return request.post?.id ? Number(request.post.id) : null;
    },
);