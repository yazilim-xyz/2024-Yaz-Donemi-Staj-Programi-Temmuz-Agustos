const shuffleArray = (array) => {
    return [...array].sort(() => Math.random() - 0.5);
  };
  
  export const fetchQuizData = async (difficulty, amount) => {
    const url = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
  
      if (data.results) {
        return data.results.map((dt) => ({
          ...dt,
          answers: shuffleArray([...dt.incorrect_answers, dt.correct_answer]),
        }));
      } else {
        return [];
      }
    } catch (error) {
      console.error('Error fetching quiz data:', error);
      return [];
    }
  };
  