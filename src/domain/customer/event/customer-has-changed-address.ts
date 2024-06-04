import EventInterface from '../../@shared/event/event.interface';

export default class CustomerHasChangedAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: { customerId: string; name: string; newAddress: string };

  constructor(eventData: any) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
