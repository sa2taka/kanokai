import { Weather } from './type/weather';
import { fetchWeather } from './weather';

export function morningFirstCall() {
  return 'おはようマスター';
}

type MyWeather =
  | 'dizzle'
  | 'rain'
  | 'showerRain'
  | 'thunderstorm'
  | 'snow'
  | 'sleet'
  | 'showerSnow'
  | 'fog'
  | 'clear'
  | 'cloud'
  | 'undefined';

export function weatherText(): Promise<string> {
  return fetchWeather()
    .then((value) => {
      if (!value) {
        return Promise.reject('weather');
      }

      const nowWeather = value.data[0];
      const nowWeatherText = myWeatherText(
        kindOfMyWeather(nowWeather.weather),
        true
      );
      const nowDate = new Date(nowWeather.timestamp_local);
      let maxTemp = { temp: nowWeather.temp, time: nowDate };
      let minTemp = { temp: nowWeather.temp, time: nowDate };
      let maxPop = { pop: nowWeather.pop, time: nowDate };
      let isNecessaryUmbrella = detectNecessaryUmbrella(nowWeather.weather);
      let isSameWeather = true;

      const hoursText = value.data
        .map((data, index) => {
          const date = new Date(data.timestamp_local);
          if (nowDate.toDateString !== date.toDateString) {
            return null;
          }
          if (index === 0) {
            return null;
          }

          const pre = value.data[index - 1];
          const post = data;

          const preWeatherText = kindOfMyWeather(pre.weather);
          const postWeatherText = kindOfMyWeather(post.weather);

          if (maxTemp.temp < post.temp) {
            maxTemp = { temp: post.temp, time: date };
          }

          if (minTemp.temp > post.temp) {
            minTemp = { temp: post.temp, time: date };
          }

          if (maxPop.pop < post.pop) {
            maxPop = { pop: post.pop, time: date };
          }

          if (detectNecessaryUmbrella(post.weather)) {
            isNecessaryUmbrella = true;
          }
          if (preWeatherText === postWeatherText) {
            return null;
          }

          isSameWeather = false;
          const hour = new Date(post.timestamp_local).getHours();
          return `${hour}時から${myWeatherText(postWeatherText)}みたい。\n`;
        })
        .filter((text) => text)
        .join('それから、');

      let text = `${
        isSameWeather
          ? `今日は一日中${nowWeatherText}みたい`
          : `イマは${nowWeatherText}みたいね`
      }。\nイマの降水確率は${nowWeather.pop}%。温度は${nowWeather.temp}℃${
        nowWeather.temp !== nowWeather.app_temp
          ? `、でも体感温度は${nowWeather.app_temp}℃`
          : ''
      }らしいわ。\n`;

      text += hoursText;
      if (isNecessaryUmbrella) {
        text += '今日は傘を持っていくほうが良いわね。\n';
      }

      text += `\nこれから24時までの最大気温は${maxTemp.time.getHours()}時に${
        maxTemp.temp
      }℃、最低気温は${minTemp.time.getHours()}時に${
        minTemp.temp
      }℃だわ。最大降水確率は${maxPop.time.getHours()}時に${maxPop.pop}%よ`;

      return text;
    })
    .catch((error) => {
      return error;
    });
}

/**
 *
 * @param weather
 * @returns  dizzle | rain | showerRain | thunderstorm | snow | sleet | showerSnow | fog | clear | cloud | undefined
 */
function kindOfMyWeather(weather: Weather): MyWeather {
  switch (weather.code) {
    case 200:
    case 201:
    case 202:
    case 230:
    case 231:
    case 232:
    case 233:
      return 'thunderstorm';
    case 300:
    case 301:
    case 302:
      return 'dizzle';
    case 500:
    case 501:
    case 502:
    case 511:
      return 'rain';
    case 520:
    case 521:
    case 522:
      return 'showerRain';
    case 601:
    case 602:
      return 'snow';
    case 610:
    case 611:
    case 612:
      return 'sleet';
    case 622:
    case 623:
      return 'showerSnow';
    case 700:
    case 711:
    case 721:
    case 731:
    case 741:
    case 751:
      return 'fog';
    case 800:
    case 801:
    case 802:
      return 'clear';
    case 803:
    case 804:
      return 'cloud';
    default:
      return 'undefined';
  }
}

function myWeatherText(weather: MyWeather, isProgressive = false) {
  switch (weather) {
    case 'dizzle':
      return isProgressive ? '小雨が降ってる' : '小雨が降る';
    case 'rain':
      return isProgressive ? '雨が降ってる' : '雨が降る';
    case 'clear':
      return isProgressive ? '晴れてる' : '晴れる';
    case 'cloud':
      return isProgressive ? '曇ってる' : '曇る';
    case 'fog':
      return isProgressive ? '霧が出てる' : '霧が出る';
    case 'showerSnow':
      return isProgressive ? '大雪が降ってる' : '大雪が降る';
    case 'showerRain':
      return isProgressive ? '大雨が降ってる' : '大雨が降る';
    case 'sleet':
      return isProgressive ? '雨と雪が一緒に降ってる' : '雨と雪が一緒に降る';
    case 'snow':
      return isProgressive ? '雪が降ってる' : '雪が降る';
    case 'thunderstorm':
      return isProgressive ? '雷雨が降ってる' : '雷雨が降る';
    case 'undefined':
      return '私のデータベースに無い天気';
  }
}

function detectNecessaryUmbrella(weather: Weather) {
  const myWeather = kindOfMyWeather(weather);
  return [
    'thunderstorm',
    'dizzle',
    'rain',
    'showerRain',
    'snow',
    'sleet',
    'snow',
    'sleet',
    'showerRain',
  ].includes(myWeather);
}
