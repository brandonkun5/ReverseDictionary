function toggleElements() {
    // Get all elements with the class "hidden" 
    const hiddenElements = ['codeBlock_One', 'codeBlock_Two', 'codeBlock_Three', 'codeBlock_Four', 'codeBlock_Five', 'codeBlock_Six']; 

    for (let i = 0; i < hiddenElements.length; i++) {
        var toggleCode = document.getElementById(hiddenElements[i]);
        toggleCode.classList.toggle("hidden");
    }

};


function replaceSpacesWithUnderscore(inputString) {
    // Using regular expression to replace spaces with underscores globally
    return inputString.replace(/ /g, '_');
};

function replaceWords(originalString, wordToReplace, replacement) {
    // Create a regular expression with the 'g' flag to replace all occurrences of the word
    const regex = new RegExp('\\b' + wordToReplace + '\\b', 'gi');
    // Use the replace() method to replace all occurrences of the word with the replacement
    return originalString.replace(regex, replacement);
}



async function getReverseDictionary() {
    document.getElementById('results_below').innerHTML = '<h5 class="results_below ms-3 mt-3">Results Below</h5>';
    document.getElementById('spinner').style.display = "flex";

    const inputPhrase = replaceSpacesWithUnderscore(document.getElementById('inputPhrase').value);
    const inputType = replaceSpacesWithUnderscore(document.getElementById('inputType').value);
    const inputWordClass = replaceSpacesWithUnderscore(document.getElementById('inputWordClass').value);

    // Use the OpenAI GPT-3 API to find a singular word
    let prompt = `What are the ten most perfect words to encapsulate the following phrase: "${inputPhrase}". when you respond,  respond with the first letter capitalized and all delimited by commas.`;
    
    if (inputType.trim() !== "") {
        prompt = prompt + '. For reference, this is for a ' + inputType;
    };

    if (inputWordClass.trim() !== "") {
        prompt = replaceWords(prompt, "words", inputWordClass + "s");
    };

    


    console.log(prompt);

    let apiUrl = 'https://w84crtjl92.execute-api.us-east-1.amazonaws.com/default/reverse_dictionary_test?prompt=' + encodeURIComponent(prompt);

    console.log(apiUrl)

    console.log(prompt);

    try {
        const response = await fetch(apiUrl);
        console.log(response);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data.chatGPToutput);
        const chatGPToutput = data.chatGPToutput;
        
        const wordsArray = chatGPToutput.split(',');
        console.log(wordsArray);

        document.getElementById('resultOne').textContent = wordsArray[0];
        document.getElementById('resultTwo').textContent = wordsArray[1];
        document.getElementById('resultThree').textContent = wordsArray[2];
        document.getElementById('resultFour').textContent = wordsArray[3];
        document.getElementById('resultFive').textContent = wordsArray[4];
        document.getElementById('resultSix').textContent = wordsArray[5];
        document.getElementById('resultSeven').textContent = wordsArray[6];
        document.getElementById('resultEight').textContent = wordsArray[7];
        document.getElementById('resultNine').textContent = wordsArray[8];
        document.getElementById('resultTen').textContent = wordsArray[9];

        document.getElementById('spinner').style.display = "none";
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
