//reference the element to html // trigger event listners op knop
// text field
//
const queryInput = document.getElementById("searchInput");
queryInput.addEventListener("keyup", setQuery);

//Search button
const querySubmit = document.getElementById("submitQuery");
querySubmit.addEventListener("click", searchCountry);

// Reference country information to output to
const countryContainer = document.getElementById("countries");


// Maak variabele die zowel in setQuery als SearchCountry kunnen gebruiken
let query = " ";

// geeft het event object (e) mee aan de setQuery function (text field) en haal de waarde eruit als er op enter wordt gedrukt

// function setQuery (){
//    searchCountry();
// }
function setQuery(e) {
    query = e.target.value;
    if (e.keyCode === 13) {
        searchCountry();
    }
}

// Declareer searchCountry functie

async function searchCountry() {

    queryInput.value = "";

    const errorMessage = document.getElementById('error-message');
    errorMessage.textContent = '';

    const previousSearchResult = document.getElementById('country');
    if(previousSearchResult){
        countryContainer.removeChild(previousSearchResult);
    }

    try {
        const result = await axios.get(`https://restcountries.eu/rest/v2/name/${query}?fullText=true`);
        const countryName = result.data[0].name;
        const subAreaName = result.data[0].subregion;
        const population = result.data[0].population;
        const capital = result.data[0].capital;
        const currencies = result.data[0].currencies;
        const languages = result.data[0].languages;
        const flagIcon = result.data[0].flag;

        const country = document.createElement("div");
        country.setAttribute('id', 'country');

        const countryFlag = document.createElement('img');
        countryFlag.setAttribute('src', flagIcon);
        country.appendChild(countryFlag);

        const countryNaming = document.createElement("h1");
        countryNaming.textContent = countryName;
        country.appendChild(countryNaming);

        const countryInfo1 = document.createElement("p");
        countryInfo1.textContent = countryName + " is situated in " + subAreaName + ". It has a population of " + population + " people."
        country.appendChild(countryInfo1);

        const countryInfo2 = document.createElement("p");
        countryInfo2.textContent = " The capital is " + capital + " and you can pay with " + numberOfCurrencies(currencies);
        country.appendChild(countryInfo2);

        const countryInfo3 = document.createElement("p");
        countryInfo3.textContent = languageDescription(languages);
        country.appendChild(countryInfo3);

        countryContainer.appendChild(country);


        function numberOfCurrencies(currencies) {
            let output = " and you can pay with ";
            if (currencies.length === 2) {
                return output + currencies[0] + " and" + currencies[1] + "'s";
            }
            return output + currencies[0].name + "'s";
        }


// function createLanguageDescription(languages){
//             let output = " They speak " + languages[0];
//     for (let i = 0; i < languages.length; i++) {
//         if(i===languages.length-1){
//             return output =output+languages[i];
//         }
//         if(languages.length===2 || i ===languages.length-2){
//             output=output+ languages[i];
//         }else {
//             output = output + languages[i] +",";
//         }
//
//     }
// }
        function languageDescription(languages) {


            const numberOfLanguages = languages.length;

            if (numberOfLanguages === 1) {
                return "They speak " + languages[0].name
            }
            if (numberOfLanguages === 2) {
                return "They speak " + languages[0].name + " and " + languages[1].name
            } else if (numberOfLanguages === 3) {
                return " They speak " + languages[0].name + " ," + languages[1].name + " and " + languages[2].name
            }
        }


        console.log(result.data[0]);
    } catch (e) {
        console.error(e);
        errorMessage.textContent= `${query} bestaat niet. Probeer het opnieuw!`;

    }


}


