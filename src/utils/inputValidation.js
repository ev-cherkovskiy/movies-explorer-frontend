const validate = (input, regExp, updater) => {
    let validSubstringLength;
    try {
        validSubstringLength = input.match(regExp)[0].length
    } catch {
        validSubstringLength = 0
    }
    updater(
        validSubstringLength === input.length
        && validSubstringLength >= 2
        && validSubstringLength <= 30
    );
}

export default validate;