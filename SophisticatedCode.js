/*
File: SophisticatedCode.js
Content: Complex Algorithm for Prime Number Generation
*/

// Function to check if a number is prime
function isPrime(num) {
    if (num < 2) {
        return false;
    }
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) {
            return false;
        }
    }
    return true;
}

// Function to generate N prime numbers using the Sieve of Eratosthenes algorithm
function generatePrimes(N) {
    let primes = [];
    let sieve = new Array(N + 1).fill(true);

    for (let p = 2; p * p <= N; p++) {
        if (sieve[p] === true) {
            for (let i = p * p; i <= N; i += p) {
                sieve[i] = false;
            }
        }
    }

    for (let p = 2; p <= N; p++) {
        if (sieve[p]) {
            primes.push(p);
        }
    }

    return primes;
}

// Main program
function main() {
    const N = 100; // Define the number of prime numbers to generate
    const primes = generatePrimes(N);

    console.log(`First ${N} prime numbers:`);
    for (let i = 0; i < primes.length; i += 10) {
        let row = "";
        for (let j = i; j < i + 10; j++) {
            if (primes[j]) {
                row += primes[j] + " ";
            }
        }
        console.log(row.trim());
    }
}

main();