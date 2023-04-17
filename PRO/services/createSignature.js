const createSignature = (secret) => {

    // Split in array of chars.
    const chars = secret.split('');

    // add white spaces in a specific format.
    chars[1] += ' ';
    chars[chars.length - 2] += ' ';
    chars[2] += '  ';
    chars[chars.length - 3] += '  ';
    chars[3] += '   ';
    chars[chars.length - 4] += '   ';
    
    // Add this custom string in secret.
    chars[chars.length / 2] += process.env.EXCHANGE_KEY;

    // Join back in to a string.
    const secretFormated = chars.join('');

    // Base64 encode the string
    const encodedStr = Buffer.from(secretFormated).toString('base64');

    return encodedStr;
}

module.exports = createSignature;