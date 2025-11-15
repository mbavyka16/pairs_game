// Этап 1. Создайте функцию, генерирующую массив парных чисел. Пример массива, который должна возвратить функция: [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8].count - количество пар.

function createNumbersArray(count) {
  let arr = [];
  for(let i = 0; i < count; ++i)
  {
    arr.push(i + 1); arr.push(i + 1);
  }
  return arr;
}

// Этап 2. Создайте функцию перемешивания массива.Функция принимает в аргументе исходный массив и возвращает перемешанный массив. arr - массив чисел

function shuffle(arr) {
  let count = arr.length, min, randomNumber, j, temp, range;
  const N = 0, M = count - 1;
  for(let i = 0; i < count; ++i)
  {
    range = Math.abs(M - N);
    randomNumber = Math.round(Math.random() * range);
    min = Math.min(N, M);
    j = min + randomNumber;
    temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}

// Этап 3. Используйте две созданные функции для создания массива перемешанными номерами. На основе этого массива вы можете создать DOM-элементы карточек. У каждой карточки будет свой номер из массива произвольных чисел. Вы также можете создать для этого специальную функцию. count - количество пар.

function clickedOnPreviousCards(arr, currentCardCover, previousCardCover, previousCardCover2)
{
  let pair = 0;
  for(let arrElem of arr)
  {
    if(arrElem === currentCardCover.parentNode.className)
    {
      pair++;
    }
  }
  for(let arrElem of arr)
  {
    if((arrElem === currentCardCover.parentNode.className && pair === 2) || currentCardCover === previousCardCover || currentCardCover === previousCardCover2 || (previousCardCover === previousCardCover2 && previousCardCover !== null && previousCardCover2 !== null))
    {
      return true
    }
  }
  return false;
}

function startGame(count) {
  const ARRAY = shuffle(createNumbersArray(count)),
  CARD_CONTAINER = document.getElementById("card-container"),
  NEW_GAME_BTN = document.getElementById("new-game-btn");

  NEW_GAME_BTN.addEventListener("click", () => {
    if(NEW_GAME_BTN.classList.contains("show-btn"))
    {
      NEW_GAME_BTN.classList.remove("show-btn");
      startGame(count);
    }
  });

  CARD_CONTAINER.innerHTML = "";
  let secondClick = false, different = false, openedElements = [], previousCardCover, previousCardCover2;
  for(let i = 0; i < ARRAY.length; ++i)
  {
    let card = document.createElement("li");
    let cardCover = document.createElement("span");
    card.textContent = ARRAY[i];
    card.classList.add("card" + ARRAY[i]);
    card.append(cardCover);
    cardCover.addEventListener("click", () => {
      switch(secondClick)
      {
        case false:
          if(clickedOnPreviousCards(openedElements, cardCover, previousCardCover, previousCardCover2)) return;
          if(different)
          {
            openedElements.splice(openedElements.length - 2, 2);
            previousCardCover.classList.remove("opacity0");
            previousCardCover2.classList.remove("opacity0");
            previousCardCover = null;
            previousCardCover2 = null;
            different = false;
          }
          previousCardCover = cardCover;
          openedElements.push(cardCover.parentNode.className);
          cardCover.classList.add("opacity0");
          secondClick = true;
          break;
        case true:
          if(clickedOnPreviousCards(openedElements, cardCover, previousCardCover, previousCardCover2)) return;
          if(cardCover.parentNode.className === openedElements[openedElements.length - 1])
          {
            cardCover.classList.add("opacity0");
            openedElements.push(cardCover.parentNode.className);
            previousCardCover = null;
            if(openedElements.length === count * 2)
            {
              NEW_GAME_BTN.classList.add("show-btn");
            }
          }
          else
          {
            cardCover.classList.add("opacity0");
            openedElements.push(cardCover.parentNode.className);
            previousCardCover2 = cardCover;
            different = true;
          }
          secondClick = false;
          break;
      }
    });
    CARD_CONTAINER.append(card);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  startGame(8);
});
