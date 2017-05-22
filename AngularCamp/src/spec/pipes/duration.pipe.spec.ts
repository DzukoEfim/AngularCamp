import { DurationPipe } from '../../app/pipes/duration.pipe';

describe('DurationPipe', () => {

  let pipe = new DurationPipe();

  it('should test non number value', () => {
    let testValue = pipe.transform(void 0);
    expect(testValue).toBe('');
    testValue = pipe.transform(NaN);
    expect(testValue).toBe('');
    testValue = pipe.transform(Infinity);
    expect(testValue).toBe('');
  });

  it('should return only minutes in case of duration < 60', () => {
    let duration = 0,
        testValue = pipe.transform(duration);
    expect(testValue).toBe(duration + 'min');
    duration = 59;
    testValue = pipe.transform(duration);
    expect(testValue).toBe(duration + 'min');
  });

  it('should return hours with minutes', () => {
    let duration = 65,
      testValue = pipe.transform(duration);
    expect(testValue).toBe('1h 5min');
    duration = 125;
    testValue = pipe.transform(duration);
    expect(testValue).toBe('2h 5min');

    duration = 60;
    testValue = pipe.transform(duration);
    expect(testValue).toBe('1h 0min');
  })
});
