const game = document.getElementById('game')
const scoreDisplay = document.getElementById('score')
let score = 0

const gameCategories = [
  {
    genre: 'cities',
    questions: [
      {
        question: 'Who wrote the Harry Potter books?',
        answers: ['JK Rowling', 'JRR Tolkien'],
        correct: 'JK Rowling',
        level: 'easy',
      },
      {
        question: 'Who was born on Krypton',
        answers: ['Aquaman', 'Superman'],
        correct: 'Superman',
        level: 'medium',
      },
      {
        question: 'Who designed the first car?',
        answers: ['Karl Benz', 'Henry Ford'],
        correct: 'Karl Benz',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'places',
    questions: [
      {
        question: 'Where is Buckingham Palace?',
        answers: ['Richmond', 'London'],
        correct: 'London',
        level: 'easy',
      },
      {
        question: 'Where is the Colosseum',
        answers: ['Rome', 'Milan'],
        correct: 'Rome',
        level: 'medium',
      },
      {
        question: 'Where is Mount Kilamanjaro',
        answers: ['Zimbabwe', 'Tanzania'],
        correct: 'Tanzania',
        level: 'hard',
      },
    ],
  },
  {
    genre: 'rivers',
    questions: [
      {
        question: 'When is Christmas?',
        answers: ['30th Dec', '24th/25th Dec'],
        correct: '24th/25th Dec',
        level: 'easy',
      },
      {
        question: 'When was JFK Shot?',
        answers: ['1963', '1961'],
        correct: '1963',
        level: 'hard',
      },
      {
        question: 'When was WW2?',
        answers: ['1932', '1941'],
        correct: '1941',
        level: 'medium',
      },
    ],
  },
  {
    genre: 'lakes',
    questions: [
      {
        question: 'What is the capital of Saudi Arabia?',
        answers: ['Jeddah', 'Riyadh'],
        correct: 'Riyadh',
        level: 'hard',
      },
      {
        question: 'What do Koalas eat?',
        answers: ['Straw', 'Eucalypt'],
        correct: 'Eucalypt',
        level: 'medium',
      },
      {
        question: 'What is a kg short for',
        answers: ['Kilojoule', 'Kilogram'],
        correct: 'Kilogram',
        level: 'easy',
      },
    ],
  },
  {
    genre: 'people',
    questions: [
      {
        question: 'How many players in a football team?',
        answers: ['15', '11'],
        correct: '11',
        level: 'easy',
      },
      {
        question: 'How many seconds in an hour?',
        answers: ['36000', '3600'],
        correct: '3600',
        level: 'medium',
      },
      {
        question: 'How many people in China?',
        answers: ['1.1 bil', '1.4 bil'],
        correct: '1.4 bil',
        level: 'hard',
      },
    ],
  },
]

function get_number_from_level(level)
{
  const values = {'easy':20,'medium':50,'hard':100}
  if (level in values) { 
    return values[level] 
  }
  alert('Error, please check console');
  throw 'Provided level:('+typeof(level)+':"'+level+'") is not supported in values';
}

function sort_questions(questions) {
  questions.sort(function(a, b){
    return get_number_from_level(a.level) - get_number_from_level(b.level);
  });
}

function giveCategory(category) {
  const column = document.createElement('div')
  column.classList.add('genre-column')

  const genreTitle = document.createElement('div')
  genreTitle.classList.add('genre-title')
  genreTitle.innerHTML = category.genre

  column.append(genreTitle)
  game.append(column)

  sort_questions(category.questions)
  
  category.questions.forEach((question) => {
    const card = document.createElement('div')
    card.classList.add('card')
    column.append(card)

    card.innerHTML = get_number_from_level(question.level)

    card.setAttribute('data-question', question.question)
    card.setAttribute('data-answer-1', question.answers[0])
    card.setAttribute('data-answer-2', question.answers[1])
    card.setAttribute('data-correct', question.correct)
    card.setAttribute('data-value', card.getInnerHTML())
    card.addEventListener('click', flipCard)
  })
}

gameCategories.forEach((category) => giveCategory(category))

function flipCard() {
  this.innerHTML = ''
  this.style.fontSize = '15px'
  this.style.lineHeight = '30px'
  const textDisplay = document.createElement('div')
  textDisplay.classList.add('card-text')
  const firstButton = document.createElement('button')
  const secondButton = document.createElement('button')
  firstButton.classList.add('first-button')
  secondButton.classList.add('second-button')
  firstButton.innerHTML = this.getAttribute('data-answer-1')
  secondButton.innerHTML = this.getAttribute('data-answer-2')
  firstButton.addEventListener('click', getResult)
  secondButton.addEventListener('click', getResult)
  this.append(textDisplay, firstButton, secondButton)
  textDisplay.innerHTML = this.getAttribute('data-question')

  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach((card) => card.removeEventListener('click', flipCard))
}

function getResult() {
  const allCards = Array.from(document.querySelectorAll('.card'))
  allCards.forEach((card) => card.addEventListener('click', flipCard))

  const cardOfButton = this.parentElement

  if (cardOfButton.getAttribute('data-correct') == this.innerHTML) {
    score = score + parseInt(cardOfButton.getAttribute('data-value'))
    scoreDisplay.innerHTML = score
    cardOfButton.classList.add('correct-answer')
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)
      }
      cardOfButton.innerHTML = cardOfButton.getAttribute('data-value')
    }, 100)
  } else {
    cardOfButton.classList.add('wrong-answer')
    setTimeout(() => {
      while (cardOfButton.firstChild) {
        cardOfButton.removeChild(cardOfButton.lastChild)
      }
      cardOfButton.innerHTML = 0
    }, 100)
  }
  cardOfButton.removeEventListener('click', flipCard)
}