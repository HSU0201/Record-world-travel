
export function convertToEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split("")
      .map((char) => 127397 + char.charCodeAt());
      console.log(codePoints);
    return String.fromCodePoint(...codePoints);
  }
  