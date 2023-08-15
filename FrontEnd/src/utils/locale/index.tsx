import i18n, {InitOptions} from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enFront from './en/front.json'
import koFront from './ko/front.json'
import enCommon from './en/common.json'
import koCommon from './ko/common.json'
import zhFront from './zh/front.json'; // 중국어 리소스 파일
import zhCommon from './zh/common.json'; // 중국어 리소스 파일
import jaFront from './ja/front.json'; // 일본어 리소스 파일
import jaCommon from './ja/common.json'; // 일본어 리소스 파일


i18n
  // user 의 언어를 탐지
  .use(LanguageDetector)

  // i18n을 react-i18next로 전달한다.
  .use(initReactI18next)

  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true, //로드가 작동하지 않는 문제를 찾는데 도움을 줌(기본값: false)
    fallbackLng: 'en', //사용자의 언어로 번역을 지원하지 않을 경우 대체할 언어
    interpolation: {
      escapeValue: false, // 기본적으로, XSS 공격을 완화하기 위해 이 값이 escape 된다. 번역을 요청할 때는 옵션을 false 로 설정할 수 있다. 
    },
    resources: { //사용할 언어들을 키로, json 파일들을 담은 객체를 값으로 써준다.
      en: {
        front: enFront,
        common: enCommon,
      },
      ko: {
        front: koFront,
        common: koCommon,
      },
      zh: { // 중국어 리소스
        front: zhFront,
        common: zhCommon,
      },
      ja: { // 일본어 리소스
        front: jaFront,
        common: jaCommon,
      },
    },
    ns: ['enFront','common'], // 로드할 네임스페이스의 문자열 또는 배열
    defaultNS: 'common', // 기본값 : translation, 번역기능에 전달되지 않은 경우 사용되는 기본 네임스페이스
    keySeparator: false, // char를 사용하여 키를 구분한다. flat 한 json으로 작업하는 경우 false 로 사용하는 것이 좋음, we use content as keys
    allowObjectInHTMLChildren: true, // html 요소가 객체를 받을수 있도록 한다. 객체를 html 요소로 전달해서 각각의 보간으로 대체할 수 있다. 값(대부분 Trans 성분 포함)
    react: {
      useSuspense: true,
    },
  }as InitOptions);

export default i18n;