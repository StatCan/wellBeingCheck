import {Modulus61Radix8, Modulus97Radix10, Modulus2833Radix62} from "./modulo-check-scheme";

test('Modulus 2833 Radix 62 (Case sensitive alpha numeric)', () => {
    expect(Modulus2833Radix62.isCorrect('myIphone6seM')).toBeTruthy();
    expect(Modulus2833Radix62.isCorrect('myiphone6seM')).toBeFalsy();
    expect(Modulus2833Radix62.isCorrect(null)).toBeFalsy();
    expect(Modulus2833Radix62.isCorrect(undefined)).toBeFalsy();
});

test('Modulus 97 Radix 10 (decimal check)', () => {
    expect(Modulus97Radix10.isCorrect('97885417')).toBeTruthy();
    expect(Modulus97Radix10.isCorrect('79885417')).toBeFalsy();
});

test('Modulus 63 Radix 8 (octal check)', () => {
    expect(Modulus61Radix8.isCorrect('23425')).toBeTruthy();
    expect(Modulus61Radix8.isCorrect('32425')).toBeFalsy();
});

test('Get a bunch of test device Ids with their checksummed form', () => {
    for(let device of ['iphone5', 'iphone5s', 'iphone6', 'iphone6s', 'iphone7', 'iphone8', 'iphoneX', 'iphone11']) {
        console.log(`${device}-->${Modulus2833Radix62.generateFullCheckedForm(device)}`);
    }
});