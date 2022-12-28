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

  console.log(wordToGuess)

  return (
    <div className='container'>
      <div>Lose Win</div>

      <HangmanDrawings />
      <HangmanWord />
      <Keyboard />
    </div>
  )
}

export default App
