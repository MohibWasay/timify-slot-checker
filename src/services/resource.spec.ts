import { ResourceService } from "./resource";

describe('ResourceService', () => {
  it('sollte erwarten, dass die Ressource verfügbar ist, wenn keine Buchung erfolgt und umgekehrt', () => {
    const availabilities = ResourceService.getAvailability({
      minDate: new Date(2012, 10, 8),
      maxDate: new Date(2012, 10, 9),
      slotMinutes: 10,
      maxOverlaps: 1,
      slotGrid: 5,
      shiftConfigs: {
        beginHour: 8,
        beginMinute: 0,
        untilHour: 16,
        untilMinute: 0
      },
      bookings: [
        {
          _id: '1',
          resourceId: '1',
          start: new Date(2012, 10, 8, 8, 30),
          end: new Date(2012, 10, 8, 9, 15),
        },
        {
          _id: '1',
          resourceId: '1',
          start: new Date(2012, 10, 8, 15, 30),
          end: new Date(2012, 10, 8, 15, 45),
        }
      ]
    });

    const availabilitiesEpoch = availabilities.map(d => d.getTime());
    
    expect(availabilitiesEpoch).toContain((new Date(2012, 10, 8, 8, 0)).getTime());
    expect(availabilitiesEpoch).toContain((new Date(2012, 10, 8, 10, 0)).getTime());
    expect(availabilitiesEpoch).toContain((new Date(2012, 10, 8, 11, 30)).getTime());
    expect(availabilitiesEpoch).toContain((new Date(2012, 10, 8, 13, 45)).getTime());
    expect(availabilitiesEpoch).not.toContain((new Date(2012, 10, 8, 8, 40)).getTime());
    expect(availabilitiesEpoch).not.toContain((new Date(2012, 10, 8, 8, 45)).getTime());
    expect(availabilitiesEpoch).not.toContain((new Date(2012, 10, 8, 9, 10)).getTime());
    expect(availabilitiesEpoch).not.toContain((new Date(2012, 10, 8, 15, 40)).getTime());
    expect(availabilitiesEpoch).not.toContain((new Date(2012, 10, 8, 15, 30)).getTime());
  });
});
