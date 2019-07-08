
const personalDataTableArrayMock = [
  'Вік:',
  '22 роки',
  'Місто:',
  'Одеса',
  'Готовий до переїзду в:',
  'Київ'
];

const personalDataTableFormattedResultMock = {
  age: '22 роки',
  city: 'Одеса',
  relocation: 'Київ'
};

const experienceInputData = [
  'TITLE:Co-founder',
  'з 08.2018 по нині\n                        (10 місяців)\n                        Bowl Bar Odessa, Одесса (ресторанный бизнес)\n                    ',
  '-открытие кафе здорового питания\n                    -разработка меню\n                    -разработка стратегии продвижения компании в соц. сетях\n                    -ведение соц.сетей\n                    -привлечение новых клиентов через соц.сети\n                    -налаживание новых каналов сбыта\n                    -работа со СМИ',
];

const experiencePrettyData = [{
  position: 'Co-founder',
  time: 'з 08.2018 по нині',
  company: 'Bowl Bar Odessa, Одесса (ресторанный бизнес)',
  description: `-открытие кафе здорового питания
-разработка меню
-разработка стратегии продвижения компании в соц. сетях
-ведение соц.сетей
-привлечение новых клиентов через соц.сети
-налаживание новых каналов сбыта
-работа со СМИ`
}];


const educationInputData = ['TITLE:Кну имени Тараса Шевченка', `
  Институт международных отношений, Киев
  Вища, з 09.2014 по 05.2018
  (3 роки 8 місяців)
`, `Международный бизнес
Переводчик английского языка`, ''];

const educationOutPutData = [{
  university: 'Кну имени Тараса Шевченка',
  department: 'Институт международных отношений, Киев',
  type: 'Вища',
  time: 'з 09.2014 по 05.2018',
  profession: 'Международный бизнес, Переводчик английского языка'
}];

const commonInputData = ['-интенсив по таргетингу Bazilik \n                        -онлайн курсы по продвижению\n                        -курсы по оптимизации сайта\n                        -интенсив по работе с лидерами мнения',
  '',
  'Зберегти у відгуки',
  'Уже у відгуках',
  'https://www.work.ua/resumes/5454163/',
  ''];

const commonInputDataWithEmptyStrings = ['\n                        Англійська — просунутий\n                        Іспанська — початковий\n                    ',
  ''];

const commonOutputDataWithEmptyStrings = [
  'Англійська — просунутий',
  'Іспанська — початковий'
];

const commonOutputData = [
  '-интенсив по таргетингу Bazilik',
  '-онлайн курсы по продвижению',
  '-курсы по оптимизации сайта',
  '-интенсив по работе с лидерами мнения'
];

module.exports = {
  commonOutputData,
  commonOutputDataWithEmptyStrings,
  commonInputDataWithEmptyStrings,
  commonInputData,
  educationOutPutData,
  educationInputData,
  experiencePrettyData,
  experienceInputData,
  personalDataTableFormattedResultMock,
  personalDataTableArrayMock,
}
