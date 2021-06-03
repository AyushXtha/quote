console.log('hello world');
const quoteText = document.querySelector('#quote');
const authorText = document.querySelector('#author');
const newQuoteButton = document.querySelector('.new-quote');
const twitterButton = document.querySelector('.twitter-button');
const loader = document.querySelector('.loader');
const quoteContainer = document.querySelector('.quote-container');
let apiQuotes = [];

function loading() {
	loader.hidden = false;
	quoteContainer.hidden = true;
}
function complete() {
	loader.hidden = true;
	quoteContainer.hidden = false;
}
function getRandomQuotes() {
	loading();
	const random = Math.floor(Math.random() * apiQuotes.length - 1);
	const randomQuote = apiQuotes[random];
	DOMChanger(randomQuote['text'], randomQuote['author']);
}

function DOMChanger(text, author) {
	if (!author) {
		authorText.innerText = 'UNKNOWN';
	} else {
		authorText.innerText = author;
	}

	if (text.length > 100) {
		quoteText.classList.add('long-quote');
	} else {
		quoteText.classList.remove('long-quote');
	}
	quoteText.innerText = text;
	complete();

	// quoteContainer.style.animation= "spin 1s linear";
}

async function getQuotes() {
	loading();

	const quoteURL = 'https://type.fit/api/quotes';
	try {
		const request = await fetch(quoteURL);
		apiQuotes = await request.json();
		getRandomQuotes();
	} catch (error) {
		console.log(error);
	}
}

function tweetQuote() {
	const twitterURL =
		`https://twitter.com/intent/tweet?text=${quoteText.textContent}` + '%0A' + `-${authorText.textContent}`;
	window.open(twitterURL, '_blank');
}

twitterButton.addEventListener('click', tweetQuote);

newQuoteButton.addEventListener('click', () => {
	getRandomQuotes();
	quoteContainer.classList.add('fadein');
	setTimeout(() => {
		quoteContainer.classList.remove('fadein');
	}, 1000);
});
//load
getQuotes();
