import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { Author } from './demo.schema';
import { AuthorInput } from './demo-input.schema';
import { CommandBus } from '@nestjs/cqrs';
import { DemoCommand } from './commands/demo.command';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Resolver((of) => Author)
export class DemoResolver {
  constructor(
    private commandBus: CommandBus,
    @Inject('PUB_SUB') private pubSub: PubSub,
  ) {}
  @Query(() => String)
  async demo() {
    return 'hello';
  }
  @Mutation(() => Author)
  async demoData(@Args('inputData') authorInput: AuthorInput) {
    this.pubSub.publish('authorAdded', { authorAdded: authorInput });
    return await this.commandBus.execute(
      new DemoCommand(
        authorInput.id,
        authorInput.firstName,
        authorInput.lastName,
      ),
    );
  }
  @Subscription(() => Author, {
    resolve: (payload) => payload.authorAdded,
  })
  authorAdded() {
    return this.pubSub.asyncIterator('authorAdded');
  }
}
