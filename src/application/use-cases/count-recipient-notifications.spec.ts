import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notifications';

describe('Count Recipient notification', () => {
  it('should be able to count recipient notification', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      notificationRepository,
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: `one`,
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: `one`,
      }),
    );

    await notificationRepository.create(
      makeNotification({
        recipientId: `two`,
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId: 'one',
    });

    expect(count).toEqual(2);
  });
});
