import { Query, Resolver } from '@nestjs/graphql';
import { Author } from './demo.schema';

@Resolver((of) => Author)
export class DemoResolver {
  @Query(() => String)
  async demo() {
    return 'hello';
  }
}
