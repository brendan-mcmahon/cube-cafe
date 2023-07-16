import words from './words.json';

export function generateRestaurantName() {
  const getRandomElementFromArray = <T,>(array: T[]): T => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  const adjective = getRandomElementFromArray(words.adjectives);
  const food = getRandomElementFromArray(words.foods);
  const noun = getRandomElementFromArray(words.restaurantTypes);

  return `${adjective} ${food} ${noun}`;
}

export function generatePersonName() {
  const getRandomElementFromArray = <T,>(array: T[]): T => {
    const index = Math.floor(Math.random() * array.length);
    return array[index];
  }

  const firstName = getRandomElementFromArray(words.firstNames);
  const middleInitial = getRandomElementFromArray(words.middleInitials);
  const lastName = getRandomElementFromArray(words.lastNames);
  const suffix = getRandomElementFromArray(words.suffixes);

  return `${firstName} ${middleInitial} ${lastName} ${suffix}`;
}