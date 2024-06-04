import EventHandlerInterface from '../../../@shared/event/event-handler.interface';
import CustomerHasChangedAddressEvent from '../customer-has-changed-address';

export default class Handler
  implements EventHandlerInterface<CustomerHasChangedAddressEvent>
{
  handle(event: CustomerHasChangedAddressEvent): void {
    console.log(
      `Endereço do cliente: ${event.eventData.customerId}, ${event.eventData.name} alterado para ${event.eventData.newAddress}`,
    );
  }
}
