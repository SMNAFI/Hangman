import { useState } from 'react'
import words from './assets/wordList.json'
import './App.scss'
import HangmanDrawings from './components/HangmanDrawings'
import HangmanWord from './components/HangmanWord'
import Keyboard from './components/Keyboard'

function App() {
  const [wordToGuess, setWordToGuess] = useState(() => {
    return words[Math.floor(Math.random() * words.length)]
  })

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  // the guessed incorrectLetters that are not in the wordToGuess
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  )

  console.log(wordToGuess)

  return (
    <div className='container'>
      <div>Lose Win</div>

      <HangmanDrawings numOfGuesses={incorrectLetters.length} />
      <HangmanWord />
      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard />
      </div>
    </div>
  )
}

export default App
