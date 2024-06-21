import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { DemoCommand } from './demo.command';
import { Inject } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@CommandHandler(DemoCommand)
export class DemoCommandHandler implements ICommandHandler<DemoCommand> {
  constructor(@Inject('PUB_SUB') private pubSub: PubSub) {}
  async execute(command: DemoCommand) {
    const data = {
      id: command.id,
      firstName: command.firstname,
      lastName: command.lastname,
    };
    console.log('data', data);
    this.pubSub.publish('authorAdded', { authorAdded: data });
    return data;
  }
}
