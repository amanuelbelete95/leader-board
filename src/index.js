import './style.css';
import { submit, scoreList, refreshBtn } from './modules/project.js';

submit.addEventListener('click', async (e) => {
  e.preventDefault();
  const userName = document.querySelector('#name');
  const score = document.querySelector('#number');

  const data = {
    user: userName.value,
    score: score.value,
  };

  try {
    const response = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/yUygKodDLYdAmKpLwZrz/scores/',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      },
    );
    await response.json();
    userName.value = '';
    score.value = '';
  } catch (error) {
    throw Error(error);
  }
});

refreshBtn.addEventListener('click', async () => {
  scoreList.innerHTML = '';
  try {
    const response = await fetch(
      'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/yUygKodDLYdAmKpLwZrz/scores/',
    );
    const data = await response.json();

    data.result.forEach((item) => {
      const scoreListItem = document.createElement('li');
      scoreListItem.classList.add('score');
      scoreListItem.innerHTML = `<span class="user-name">${item.user}:</span><span class="user-score">${item.score}</span>`;
      scoreList.append(scoreListItem);
    });
  } catch (error) {
    throw Error(error);
  }
});
