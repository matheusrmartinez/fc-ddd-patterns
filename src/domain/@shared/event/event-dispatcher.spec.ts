import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from '../../product/event/product-created.event';
import EventDispatcher from './event-dispatcher';
import Handler from '../../customer/event/handler/envia-console-log.handler';
import Handler1 from '../../customer/event/handler/envia-console-log1.handler';
import Handler2 from '../../customer/event/handler/envia-console-log2.handler';
import CustomerHasChangedAddress from '../../customer/event/customer-has-changed-address';
import CustomerCreatedEvent from '../../customer/event/customer-created.event';

describe('Domain events tests', () => {
  describe('product-created-event', () => {
    it('should register an event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'],
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'].length,
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
      ).toMatchObject(eventHandler);
    });

    it('should unregister an event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'],
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'].length,
      ).toBe(0);
    });

    it('should unregister all event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
      ).toMatchObject(eventHandler);

      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'],
      ).toBeUndefined();
    });

    it('should notify all event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendEmailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, 'handle');

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['ProductCreatedEvent'][0],
      ).toMatchObject(eventHandler);

      const productCreatedEvent = new ProductCreatedEvent({
        name: 'Product 1',
        description: 'Product 1 description',
        price: 10.0,
      });

      // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
      eventDispatcher.notify(productCreatedEvent);

      expect(spyEventHandler).toHaveBeenCalled();
    });
  });
  describe('customer-created-event', () => {
    it('should register an event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const firstEventHandler = new Handler1();
      const secondEventHandler = new Handler2();
      eventDispatcher.register('CustomerCreatedEvent', firstEventHandler);
      eventDispatcher.register('CustomerCreatedEvent', secondEventHandler);
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'],
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'].length,
      ).toBe(2);
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0],
      ).toMatchObject(firstEventHandler);
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1],
      ).toMatchObject(secondEventHandler);
    });

    it('should unregister an event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const firstEventHandler = new Handler1();
      const secondEventHandler = new Handler2();

      eventDispatcher.register('CustomerCreatedEvent', firstEventHandler);
      eventDispatcher.register('CustomerCreatedEvent', secondEventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0],
      ).toMatchObject(firstEventHandler);
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1],
      ).toMatchObject(secondEventHandler);
      eventDispatcher.unregister('CustomerCreatedEvent', secondEventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0],
      ).toMatchObject(firstEventHandler);
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1],
      ).toBeUndefined();
    });

    it('should unregister all event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const firstEventHandler = new Handler1();
      const secondEventHandler = new Handler2();

      eventDispatcher.register('CustomerCreatedEvent', firstEventHandler);
      eventDispatcher.register('CustomerCreatedEvent', secondEventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][0],
      ).toMatchObject(firstEventHandler);
      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'][1],
      ).toMatchObject(secondEventHandler);
      eventDispatcher.unregisterAll();

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'],
      ).toBeUndefined();
    });

    it('should notify all event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const firstEventHandler = new Handler1();
      const secondEventHandler = new Handler2();
      const spyEventFirstHandler = jest.spyOn(firstEventHandler, 'handle');
      const spyEventSecondHandler = jest.spyOn(secondEventHandler, 'handle');

      eventDispatcher.register('CustomerCreatedEvent', firstEventHandler);
      eventDispatcher.register('CustomerCreatedEvent', secondEventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerCreatedEvent'],
      ).toHaveLength(2);

      const customerCreatedEvent = new CustomerCreatedEvent({
        name: 'Customer 2',
      });

      eventDispatcher.notify(customerCreatedEvent);

      expect(spyEventFirstHandler).toHaveBeenCalled();
      expect(spyEventSecondHandler).toHaveBeenCalled();
    });
  });
  describe('customer-has-changed-address-event', () => {
    it('should register an event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new Handler();
      eventDispatcher.register('CustomerHasChangedAddressEvent', eventHandler);
      expect(
        eventDispatcher.getEventHandlers['CustomerHasChangedAddressEvent'],
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['CustomerHasChangedAddressEvent']
          .length,
      ).toBe(1);
      expect(
        eventDispatcher.getEventHandlers['CustomerHasChangedAddressEvent'][0],
      ).toMatchObject(eventHandler);
    });

    it('should unregister an event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new Handler();

      eventDispatcher.register('CustomerHasChangedAddressEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerHasChangedAddressEvent'][0],
      ).toMatchObject(eventHandler);

      eventDispatcher.unregister(
        'CustomerHasChangedAddressEvent',
        eventHandler,
      );

      expect(
        eventDispatcher.getEventHandlers['CustomerHasChangedAddressEvent'],
      ).toBeDefined();
      expect(
        eventDispatcher.getEventHandlers['CustomerHasChangedAddressEvent']
          .length,
      ).toBe(0);
    });

    it('should unregister all event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new Handler();
      eventDispatcher.register('CustomerHasChangedAddressEvent', eventHandler);
      expect(
        eventDispatcher.getEventHandlers['CustomerHasChangedAddressEvent'][0],
      ).toMatchObject(eventHandler);
      eventDispatcher.unregisterAll();
      expect(
        eventDispatcher.getEventHandlers['CustomerHasChangedAddressEvent'],
      ).toBeUndefined();
    });

    it('should notify all event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new Handler();
      const spyEventFirstHandler = jest.spyOn(eventHandler, 'handle');

      eventDispatcher.register('CustomerHasChangedAddressEvent', eventHandler);

      expect(
        eventDispatcher.getEventHandlers['CustomerHasChangedAddressEvent'],
      ).toHaveLength(1);

      const customerHasChangedAddress = new CustomerHasChangedAddress({
        customerId: '123',
        name: 'CP',
        newAddress: 'Rua 1',
      });

      eventDispatcher.notify(customerHasChangedAddress);

      expect(spyEventFirstHandler).toHaveBeenCalledWith(
        customerHasChangedAddress,
      );
    });
  });
});
