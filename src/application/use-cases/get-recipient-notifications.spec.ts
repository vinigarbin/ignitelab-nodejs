import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get Recipient notifications', () => {
  it('should be able to get recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId: 'one',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'one' }),
        expect.objectContaining({ recipientId: 'one' }),
      ]),
    );
  });
});
