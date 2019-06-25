const {
  createPersonalDataTable,
  prettifyExperienceSection,
} = require('../parserUtils');

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
  `з 08.2018 по нині
   (10 місяців)`,
  'Bowl Bar Odessa, Одесса (ресторанный бизнес)',
  `-открытие кафе здорового питания
-разработка меню
-разработка стратегии продвижения компании в соц. сетях
-ведение соц.сетей
-привлечение новых клиентов через соц.сети
-налаживание новых каналов сбыта
-работа со СМИ`, 'TITLE:SMM-manager',
  `з 08.2018 по нині 
  (10 місяців)`,
  'Bowl Bar Odessa, Одесса (ресторанный бизнес)', `- создание Tone of voice бренда;
- Pre-production (креатив, идеи, референсы) и post-production (обработка материалов — фотошопы, создание анимаций, витрин, видеоредакторы);
- контент - план и четкое ему следование;
- коммуникация с аудиторией – вовлечение, конкурсные механики и другие активации;
- Influence-маркетинг, работа с лидерами мнений;
- создание вебсайта на платформе Wordpress;
- настройка рекламных компаний Facebook Adwords;
- отслеживание результатов РК;
- ретаргетинг;
- создание рекламных материалов ( флаеры, визитки, меню, банеры)`
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
}, {
  position: 'SMM-manager',
  time: 'з 08.2018 по нині',
  company: 'Bowl Bar Odessa, Одесса (ресторанный бизнес)',
  description: `- создание Tone of voice бренда;
- Pre-production (креатив, идеи, референсы) и post-production (обработка материалов — фотошопы, создание анимаций, витрин, видеоредакторы);
- контент - план и четкое ему следование;
- коммуникация с аудиторией – вовлечение, конкурсные механики и другие активации;
- Influence-маркетинг, работа с лидерами мнений;
- создание вебсайта на платформе Wordpress;
- настройка рекламных компаний Facebook Adwords;
- отслеживание результатов РК;
- ретаргетинг;
- создание рекламных материалов ( флаеры, визитки, меню, банеры)`
}];


describe('parser utils functions', () => {
  describe('createPersonalDataTable', () => {
    it('should create proper object from array', () => {
      expect(createPersonalDataTable(personalDataTableArrayMock))
        .toEqual(personalDataTableFormattedResultMock);
    });
  });

  describe('prettifyExperienceSection', () => {
    it('should make readable data structure from array', () => {
      expect(prettifyExperienceSection(experienceInputData))
        .toEqual(experiencePrettyData);
    });
  });
});
