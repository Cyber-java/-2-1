export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; //стартовый индекс
  return [...items].splice(startIndex, pageSize); //возвращаем новый массив через спред оператор и в методе slice указываем стартовый индекс и кол-во элементов необходимое получить после стартового индекса
}
