import {
  GENDER_TYPE,
  LANGUAGE_CODE,
  LOCATION_CODE,
} from '../enums/common/common.enum';

/**
 * @description 언어코드 표기명 변환하는 함수
 * @param value
 * @param isEnglish
 * @returns
 */
export const langTransformer = (value: LANGUAGE_CODE, isEnglish?: boolean) => {
  if (!isEnglish) {
    // 해당 언어 표기
    switch (value) {
      case LANGUAGE_CODE.KO:
        return '한국어';
      case LANGUAGE_CODE.JA:
        return '日本語';
      case LANGUAGE_CODE.CN:
        return '中文';
      case LANGUAGE_CODE.EN:
        return 'English';
      case LANGUAGE_CODE.ES:
        return 'Español';
      case LANGUAGE_CODE.FR:
        return 'français';
      case LANGUAGE_CODE.IT:
        return 'Italiano';
      case LANGUAGE_CODE.RU:
        return 'Русский';
      case LANGUAGE_CODE.TR:
        return 'Türkçe';
      case LANGUAGE_CODE.DE:
        return 'Deutsch';
    }
  } else {
    // 영문 표기
    switch (value) {
      case LANGUAGE_CODE.KO:
        return 'Korean';
      case LANGUAGE_CODE.JA:
        return 'Japanese';
      case LANGUAGE_CODE.CN:
        return 'Chinese';
      case LANGUAGE_CODE.EN:
        return 'English';
      case LANGUAGE_CODE.ES:
        return 'Spanish';
      case LANGUAGE_CODE.FR:
        return 'French';
      case LANGUAGE_CODE.IT:
        return 'Italian';
      case LANGUAGE_CODE.RU:
        return 'Russian';
      case LANGUAGE_CODE.TR:
        return 'Turkish';
      case LANGUAGE_CODE.DE:
        return 'German';
    }
  }
};

/**
 * @description 국가 표기명 변환하는 함수
 * @param value
 * @param isEnglish
 * @returns
 */
export const locationTransformer = (
  value: LOCATION_CODE,
  isEnglish?: boolean
) => {
  if (!isEnglish) {
    // 해당 국가 표기
    switch (value) {
      case LOCATION_CODE.KR:
        return '한국';
      case LOCATION_CODE.JP:
        return '일본';
      case LOCATION_CODE.CN:
        return '중국';
      case LOCATION_CODE.US:
        return '미국';
      case LOCATION_CODE.ES:
        return '스페인';
    }
  } else {
    // 영문 표기
    switch (value) {
      case LOCATION_CODE.KR:
        return 'Korea';
      case LOCATION_CODE.JP:
        return 'Japan';
      case LOCATION_CODE.CN:
        return 'China';
      case LOCATION_CODE.US:
        return 'America';
      case LOCATION_CODE.ES:
        return 'Spain';
    }
  }
};

/**
 *
 * @param gender 성별 표기명 변환하는 함수
 * @returns
 */
export const genderTransformer = (gender: GENDER_TYPE | null) => {
  switch (gender) {
    case GENDER_TYPE.MALE:
      return '남자';
    case GENDER_TYPE.FEMALE:
      return '여자';
    case GENDER_TYPE.OTHER:
      return '기타';
  }
};
