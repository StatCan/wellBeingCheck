/**
 * Class implementing the Modulo m,r digit check algorithm where r is the number of symbols in the alphabet and m is
 * the greatest prime number smaller than r^2. To generate the check digit for the number N, expressed in the numeral
 * positional system in basis r, the formula check digits = m + 1 - N * r^2 mod m. The complete message (N and its check digits)
 * is N * r^2 + check. The full message modulo m always gives 1. And that is how we check if the full message is valid.
 */
class ModuloCheckScheme {

    /**
     * Prime number used as the modulus. It has to be the biggest that is smaller than the radix
     */
    private readonly modulus: number;

    /**
     * The size of the alphabet. It is the basis of the numeral system
     */
    private readonly radix: number;

    /**
     * Symbols of the alphabet or digits of the numeral system
     */
    private readonly digits: string;

    /**
     * Mapping between symbol and digit value in the numeral system. The key is in fact a character but since there is no
     * type for a single character then string is instead used.
     */
    private readonly weight: Map<string, number>;

    /**
     * Builds a check scheme based on the modulus and the set of symbols
     * @param modulus biggest prime number that is smaller than the length of the given symbols
     * @param symbols ordered list of the symbols starting with the smallest digit value
     */
    constructor(modulus:number, symbols: string) {
        this.modulus = modulus;
        this.digits = symbols;
        this.weight = new Map<string, number>();
        this.radix = symbols.length;

        //first symbol has digit 0, second has 1, ...
        for (let i = 0; i < symbols.length; i++) {
            let digit = symbols[i];
            if (this.weight[digit] !== undefined) {
                throw new Error(`he symbols contain repeating character ${digit} which is not valid`)
            }
            this.weight[digit] = i;
        }
    }

    /**
     * Given a number, this will produce the number followed by its checksum
     * @param numberString number for which we want to build the full form
     * @return number concatenated with its checksum. If the input is null then the output is null
     */
    generateFullCheckedForm(numberString: string): string {
        return numberString ? `${numberString}${this.generateCheckDigits(numberString)}` : null
    }

    /**
     * Checks whether the number with its checksum match
     * @param fullCheckedFormNumber full form of number and checksum
     * @return true if the last 2-digits form the checksum of preceding digits
     */
    isCorrect(fullCheckedFormNumber: string): boolean {
        return this.mod(fullCheckedFormNumber) == 1;
    }

    /**
     * Generate the check digits fo the a given number expressed in the numeral system
     * @param numberString a number expressed in the numeral system basis radix
     * @return 2-digit checksum for the given number
     */
    private generateCheckDigits(numberString: string): string {
        let zero = this.digits[0];

        // number * r^2
        let shifted = `${numberString}${zero}${zero}`;
        let remain = this.modulus + 1 - this.mod(shifted);

        return this.toString(remain);
    }

    /**
     * Computes the N mod m
     * @param numberString represents a number expressed in the numeral system of basis radix
     * @return numberString mod modulus
     */
    private mod(numberString: string): number {
        let remain = 0;
        // Horner's method is used to compute N mod M
        for (let i = 0; numberString && i < numberString.length; i++) {
            let digit = numberString[i];
            let w = this.weight[digit];
            remain = (remain * this.radix + w) % this.modulus;
        }
        return remain;
    }

    /**
     * Convert the number remain into its representation in the numeral system using the alphabet
     * @param remain an integer value not exceeding r^2
     * @return 2-digits representing the value of the remain expressed in the numeral system
     */
    private toString(remain: number): string {
        let unit = remain % this.radix;
        let tenth = Math.floor(remain / this.radix);

        return `${this.digits[tenth]}${this.digits[unit]}`;
    }
}

// Octal check
export const Modulus61Radix8 = new ModuloCheckScheme(61, '01234567')

// Decimal check
export const Modulus97Radix10 = new ModuloCheckScheme(97, '0123456789');

// Case sensitive alpha numeric check
export const Modulus2833Radix62 = new ModuloCheckScheme(2833, '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')