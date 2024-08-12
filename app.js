const form = document.querySelector('form');
const result = document.querySelector('.result');

function constructApiEndpoint(word, language, version = 'v2') {
  return `https://api.dictionaryapi.dev/api/${version}/entries/${language}/${word}`;
}



form.addEventListener("submit", function (e) {
  e.preventDefault();

  let word = document.querySelector('#user-input').value,
    language = 'en';


  // no word
  if (word.length == 0) {
    result.innerHTML = `<p>nemate rec, unesite neku</p>`
    console.log('nemate rec');
  } else {
    fetch(constructApiEndpoint(word, language))
      .then((resp) => resp.json())
      // valid word
      .then((data) => {
        console.log(data);
        console.log(data[0].word);
        console.log(data[0].meanings[0].partOfSpeech);
        console.log(data[0].meanings[0].definitions[0].definition);

        result.innerHTML = `
        <h1>${data[0].word}</h1>
        <h2>/ ${data[0].meanings[0].partOfSpeech} /</h2>
        <p>${data[0].meanings[0].definitions[0].definition}</p>
        `

      }).catch(() => {
        result.innerHTML = `<p>No such word here, sorry.</p>`
      });
  }
});
