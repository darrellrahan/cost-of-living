import { useEffect, useState } from "react";

function App() {
  const [synonymList, setSynonymList] = useState([]);
  const [word, setWord] = useState({
    onChangeWord: "",
    finalWord: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  function getSynonym(word) {
    setIsLoading(true);

    fetch(`https://api.datamuse.com/words?rel_syn=${word}`)
      .then((res) => res.json())
      .then((res) => {
        setSynonymList(res.map((data) => data.word));
        setIsLoading(false);
      });
  }

  useEffect(() => {
    getSynonym(word.finalWord);
  }, [word.finalWord]);

  return (
    <div className="app-container">
      <h1>Get Synonyms</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setWord((prevWord) => {
            return {
              ...prevWord,
              finalWord: word.onChangeWord,
            };
          });
        }}
      >
        <label htmlFor="word-input">Your Word: </label>
        <input
          type="text"
          id="word-input"
          onChange={(e) =>
            setWord((prevWord) => {
              return {
                ...prevWord,
                onChangeWord: e.target.value,
              };
            })
          }
          value={word.onChangeWord}
        />
        <input type="submit" value="Submit" />
      </form>
      {isLoading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <ul>
          {synonymList.length !== 0 ? (
            <>
              <p className="found-text">Synonym(s) of {word.finalWord}:</p>
              {synonymList.map((synonym, index) => (
                <li
                  key={index}
                  onClick={() =>
                    setWord({
                      onChangeWord: synonym,
                      finalWord: synonym,
                    })
                  }
                >
                  {synonym}
                </li>
              ))}
            </>
          ) : (
            word.finalWord !== "" && (
              <p className="not-found-text">
                No synonyms found for "{word.finalWord}"
              </p>
            )
          )}
        </ul>
      )}
    </div>
  );
}

export default App;
