const decodeSignature = (signature) => {

    // Base64 decode the string.
    const decodedStr = Buffer.from(signature, 'base64').toString();

    const key = process.env.EXCHANGE_KEY;
    // Remove the custom string from the decoded string.
    const secretFormated = decodedStr.replace(key, '');
    
    // Join the array back into a string.
    const initialSecret = secretFormated.replace(/\s+/g, '');

    if (initialSecret === process.env.EXCHANGE_SECRET) {
        return true;
    }

    return false;
}

module.exports = decodeSignature;