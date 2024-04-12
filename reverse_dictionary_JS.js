function replaceSpacesWithUnderscore(inputString) {
    // Using regular expression to replace spaces with underscores globally
    return inputString.replace(/ /g, '_');
};

async function getReverseDictionary() {
    document.getElementById('results_below').innerHTML = '<h5 class="results_below ms-3 mt-3">Results Below</h5>';
    document.getElementById('spinner').style.display = "flex";

    const inputPhrase = replaceSpacesWithUnderscore(document.getElementById('inputPhrase').value);
    const inputType = document.getElementById('inputType').value;
    const inputTone = document.getElementById('inputTone').value;

    // Use the OpenAI GPT-3 API to find a singular word
    let prompt = `What are the five best words for "${inputPhrase}", when you respond, just respond with the words, with the first letter capitalized and all of the words delimited by commas.`;
    let apiUrl = 'https://w84crtjl92.execute-api.us-east-1.amazonaws.com/default/reverse_dictionary_test?prompt=' + encodeURIComponent(prompt);

    if (inputType.trim() !== "") {
        prompt = prompt + 'For reference, this is for a ' + inputType;
    }

    if (inputTone.trim() !== "") {
        prompt = prompt + '. For reference, I am going for a  ' + inputTone + ' tone.';
    }

    console.log(prompt);
    console.log(apiUrl);

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        const chatGPToutput = data.choices[0].message.content;
        console.log(chatGPToutput);
        const singularWord = findWordsInQuotations(chatGPToutput);
        
        const wordsArray = chatGPToutput.split(',');

        document.getElementById('resultOne').textContent = wordsArray[0];
        document.getElementById('resultTwo').textContent = wordsArray[1];
        document.getElementById('resultThree').textContent = wordsArray[2];
        document.getElementById('resultFour').textContent = wordsArray[3];
        document.getElementById('resultFive').textContent = wordsArray[4];

        document.getElementById('spinner').style.display = "none";
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}
