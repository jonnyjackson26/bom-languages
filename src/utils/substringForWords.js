export function substringForWords(text, startWord, endWord) {
    // Split the text into words
    const words = text.split(/\s+/);
    const startIndex = startWord

    let endIndex;
    if (endWord === 'end') {
        endIndex = words.length;
    } else {
        // Adjust end index to handle negative values and ensure it is within bounds
        endIndex = Math.min(endWord, words.length);
    }

    // Extract the desired substring of words
    const substring = words.slice(startIndex, endIndex).join(' ');

    return substring;
}
