

function findWordsInQuotations(sentence) {
    // Regular expression to match words within double quotations
    // This regex pattern captures words within double quotes
    const regex = /"([^"]+)"/g;

    // Use the match method to find all words in quotations
    const matches = sentence.match(regex);

    if (matches) {
        // Extract and print the words within quotations
        const wordsInQuotations = matches.map(match => match.replace(/"/g, '')); // Remove double quotes
        return wordsInQuotations;
    } else {
        return [];
    }
    }

    // Replace with your actual API key
    const apiKey = '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';

    async function getReverseDictionary() {

        document.getElementById('results_below').innerHTML = '<h5 class="results_below ms-3 mt-3">Results Below</h5>';
        document.getElementById('spinner').style.display = "flex";

        const inputPhrase = document.getElementById('inputPhrase').value;
        const inputType = document.getElementById('inputType').value;
        const inputTone = document.getElementById('inputTone').value;

        // Use the OpenAI GPT-3 API to find a singular word
        let prompt = `What is are the five best words for "${inputPhrase}", when you respond, just respond with the words, with the first letter capitalized and all of the words delimited by commas.`;

        if (inputType.trim() === "") {
            console.log("InputType is empty!");
        } else {
            prompt = prompt + 'For reference, this is for a ' + inputType;
        }

        if (inputTone.trim() === "") {
            console.log("InputTone is empty!");
        } else {
            prompt = prompt + '. For reference, I am going for a  ' + inputTone + ' tone.';
        }

        console.log(prompt)

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    {
                        role: 'system',
                        content: "You are a dictionary"
                    },
                    {
                        role: 'user',
                        content: prompt
                    }
                ],
                max_tokens: 50, // Limit the response to one token (word)
            }), 
        });

        const data = await response.json();
        console.log(data)
        const chatGPToutput = data.choices[0].message.content;
        console.log(chatGPToutput)
        const singularWord = findWordsInQuotations(chatGPToutput)
        
        const wordsArray = chatGPToutput.split(',')

        document.getElementById('resultOne').textContent = wordsArray[0];
        document.getElementById('resultTwo').textContent = wordsArray[1];
        document.getElementById('resultThree').textContent = wordsArray[2];
        document.getElementById('resultFour').textContent = wordsArray[3];
        document.getElementById('resultFive').textContent = wordsArray[4];

        document.getElementById('spinner').style.display = "none";
    }

function toggleCode_One() {
  var codeBlock_One = document.getElementById("codeBlock_One");
  codeBlock_One.classList.toggle("hidden");
}

function toggleCode_Two() {
  var codeBlock_Two = document.getElementById("codeBlock_Two");
  codeBlock_Two.classList.toggle("hidden");
}

function toggleCode_Three() {
  var codeBlock_Three = document.getElementById("codeBlock_Three");
  codeBlock_Three.classList.toggle("hidden");
}

function toggleCode_Four() {
  var codeBlock_Four = document.getElementById("codeBlock_Four");
  codeBlock_Four.classList.toggle("hidden");
}

/// Get the defintion for a word
async function showDefinition(element) {
    const WordsapiKey = 'b4f2366299mshd0f0393c3211233p14b97bjsn052c7b89f192'; // Replace with your WordsAPI key
    const define_word = element.textContent;
    console.log(define_word)
    const url = `https://wordsapiv1.p.rapidapi.com/words/${define_word}`;

    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': WordsapiKey,
        },
        });

        const data = await response.json();

        if (response.ok) {
        const definitionElement = document.getElementById('definitionOne');
        definitionElement.innerHTML = `<p class="word">${define_word}</p><p class="definition"><i>${data.results[0].definition}</i></p>`;
        } else {
        console.error(`Error fetching definition for ${define_word}: ${data.message}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function showDefinitionTwo(element) {
    const WordsapiKey = 'b4f2366299mshd0f0393c3211233p14b97bjsn052c7b89f192'; // Replace with your WordsAPI key
    const define_word = element.textContent.trim();
    console.log(define_word)
    const url = `https://wordsapiv1.p.rapidapi.com/words/${define_word}`;

    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': WordsapiKey,
        },
        });

        const data = await response.json();

        if (response.ok) {
        const definitionElement = document.getElementById('definitionTwo');
        definitionElement.innerHTML = `<p class="word">${define_word}</p><p class="definition"><i>${data.results[0].definition}</i></p>`;
        } else {
        console.error(`Error fetching definition for ${define_word}: ${data.message}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function showDefinitionThree(element) {
    const WordsapiKey = 'b4f2366299mshd0f0393c3211233p14b97bjsn052c7b89f192'; // Replace with your WordsAPI key
    const define_word = element.textContent.trim();
    console.log(define_word)
    const url = `https://wordsapiv1.p.rapidapi.com/words/${define_word}`;

    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': WordsapiKey,
        },
        });

        const data = await response.json();

        if (response.ok) {
        const definitionElement = document.getElementById('definitionThree');
        definitionElement.innerHTML = `<p class="word">${define_word}</p><p class="definition"><i>${data.results[0].definition}</i></p>`;
        } else {
        console.error(`Error fetching definition for ${define_word}: ${data.message}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function showDefinitionFour(element) {
    const WordsapiKey = 'b4f2366299mshd0f0393c3211233p14b97bjsn052c7b89f192'; // Replace with your WordsAPI key
    const define_word = element.textContent.trim();
    console.log(define_word)
    const url = `https://wordsapiv1.p.rapidapi.com/words/${define_word}`;

    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': WordsapiKey,
        },
        });

        const data = await response.json();

        if (response.ok) {
        const definitionElement = document.getElementById('definitionFour');
        definitionElement.innerHTML = `<p class="word">${define_word}</p><p class="definition"><i>${data.results[0].definition}</i></p>`;
        } else {
        console.error(`Error fetching definition for ${define_word}: ${data.message}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}

async function showDefinitionFive(element) {
    const WordsapiKey = 'b4f2366299mshd0f0393c3211233p14b97bjsn052c7b89f192'; // Replace with your WordsAPI key
    const define_word = element.textContent.trim();
    console.log(define_word)
    const url = `https://wordsapiv1.p.rapidapi.com/words/${define_word}`;

    try {
        const response = await fetch(url, {
        method: 'GET',
        headers: {
            'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
            'X-RapidAPI-Key': WordsapiKey,
        },
        });

        const data = await response.json();

        if (response.ok) {
        const definitionElement = document.getElementById('definitionFive');
        definitionElement.innerHTML = `<p class="word">${define_word}</p><p class="definition"><i>${data.results[0].definition}</i></p>`;
        } else {
        console.error(`Error fetching definition for ${define_word}: ${data.message}`);
        }
    } catch (error) {
        console.error('An error occurred:', error);
    }
}
