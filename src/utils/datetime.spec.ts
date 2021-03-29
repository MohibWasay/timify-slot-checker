import { DatetimeService } from "@app/utils/datetime";

describe('DatetimeService', () => {
  it('erwarten Sie, dass isBetween() wahr ist, wenn das Datum zwischen Start- und Enddatum liegt!', () => {
    expect(
      DatetimeService.isBetween(
        new Date(2021, 10, 10, 8, 30),
        [
          new Date(2021, 10, 10, 8, 20),
          new Date(2021, 10, 10, 8, 40)
        ]
      )
    ).toBe(true);
  });

  it('erwarten Sie, dass isBetween() wahr ist, wenn das Datum das Enddatum ist!', () => {
    expect(
      DatetimeService.isBetween(
        new Date(2021, 10, 10, 8, 40),
        [
          new Date(2021, 10, 10, 8, 20),
          new Date(2021, 10, 10, 8, 40)
        ],
        { inclusive: true }
      )
    ).toBe(true);
  });

  it('erwarten Sie, dass isBetween () wahr ist, wenn das Datum das Startdatum ist!', () => {
    expect(
      DatetimeService.isBetween(
        new Date(2021, 10, 10, 8, 20),
        [
          new Date(2021, 10, 10, 8, 20),
          new Date(2021, 10, 10, 8, 40)
        ],
        { inclusive: true }
      )
    ).toBe(true);
  });

  it('erwarten Sie, dass updateTime () ein neues Datum mit hinzugefügten Tagen, Stunden und Minuten zurückgibt', () => {
    expect(
      DatetimeService.updateTime(
        new Date(2021, 10, 10, 8, 20),
        {
          days: 8,
          hours: 8,
          minutes: 15
        }
      ).getTime()
    ).toBe((new Date(2021, 10, 18, 16, 35)).getTime());
  });
});