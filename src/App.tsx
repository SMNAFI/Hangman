import { useEffect, useState } from 'react'
import words from './assets/wordList.json'
import HangmanDrawings from './components/HangmanDrawings'
import HangmanWord from './components/HangmanWord'
import Keyboard from './components/Keyboard'
import './App.scss'

const getWord = () => {
  return words[Math.floor(Math.random() * words.length)]
}

function App() {
  const [wordToGuess, setWordToGuess] = useState(getWord)

  const [guessedLetters, setGuessedLetters] = useState<string[]>([])

  // the guessed incorrectLetters that are not in the wordToGuess
  const incorrectLetters = guessedLetters.filter(
    (letter) => !wordToGuess.includes(letter)
  )

  console.log(wordToGuess)

  const isWinner = wordToGuess
    .split('')
    .every((letter) => guessedLetters.includes(letter))
  const isLooser = incorrectLetters.length >= 6

  function addGuessedLetter(letter: string) {
    if (guessedLetters.includes(letter) || isWinner || isLooser) return

    setGuessedLetters((currentLetters) => [...currentLetters, letter])
    // useCallback(() => {

    // }, [guessedLetters])
  }

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (!key.match(/^[a-z]$/)) return

      e.preventDefault()
      addGuessedLetter(key)
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [guessedLetters])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key

      if (key !== 'Enter') return

      e.preventDefault()
      setGuessedLetters([])
      setWordToGuess(getWord())
    }

    document.addEventListener('keypress', handler)

    return () => {
      document.removeEventListener('keypress', handler)
    }
  }, [])

  return (
    <div className='container'>
      <div>
        {isWinner ? 'Winner! - Refresh the page to play again' : ''}{' '}
        {isLooser ? 'Nice try! - Refresh the page to play again' : ''}
      </div>

      <HangmanDrawings numOfGuesses={incorrectLetters.length} />
      <HangmanWord
        reveal={isLooser}
        guessedLetters={guessedLetters}
        wordToGuess={wordToGuess}
      />

      <div style={{ alignSelf: 'stretch' }}>
        <Keyboard
          disabled={isWinner || isWinner}
          activeLetters={guessedLetters.filter((letter) =>
            wordToGuess.includes(letter)
          )}
          inactiveLetters={incorrectLetters}
          addGuessedLetter={addGuessedLetter}
        />
      </div>
    </div>
  )
}

export default App
