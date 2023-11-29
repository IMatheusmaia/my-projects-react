import { NewsType } from '../types';

function convertDate(list: NewsType[]) {
  const today = new Date();
  return list.map((news) => {
    const matrix = news.data_publicacao.match(/[^/\s]+|\d+|\s*/g)?.filter((item) => (item !== ' ' && item !== '')).map((item, index) => {
      if (index <= 2) {
        return Number(item);
      }
      return Array.from(item.split(':').map((number) => Number(number)));
    });
    const chield = matrix?.[3];
    const father = matrix?.splice(0, 3);
    const timeArray = [...father as number[], ...chield as number[]];
    const time = new Date(
      timeArray[2],
      timeArray[1] - 1,
      timeArray[0],
      timeArray[3],
      timeArray[4],
    );
    const diff = Math.abs(today.getTime() - time.getTime());
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    return { ...news, diffDays };
  });
}

export default convertDate;
