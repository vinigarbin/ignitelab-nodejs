import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from '../repositories/notification-repository';

interface CountRecipientNotificationsRequest {
  recipientId: string;
}

type CountRecipientNotificationsResponse = {
  count: number;
};

@Injectable()
export class CountRecipientNotifications {
  constructor(private repository: NotificationsRepository) {}

  async execute(
    request: CountRecipientNotificationsRequest,
  ): Promise<CountRecipientNotificationsResponse> {
    const { recipientId } = request;

    const count = await this.repository.countManyByRecipientId(recipientId);

    return { count };
  }
}
