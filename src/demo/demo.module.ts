import { Module } from '@nestjs/common';
import { DemoResolver } from './demo.resolver';
import { PubSub } from 'graphql-subscriptions';
import { CqrsModule } from '@nestjs/cqrs';
import { DemoCommandHandler } from './commands/demo.handler';

@Module({
  imports: [CqrsModule],
  providers: [
    DemoResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
    DemoCommandHandler,
  ],
})
export class DemoModule {}
