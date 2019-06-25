const {
  parse,
  getPageResumeLinks,
  getPagesCount,
  getDom,
  parseResumeData,
  parseCommonData
} = require('../parser');
const fs = require('fs');

const htmlPageMock = fs.readFileSync('./test/resume-list-first-page.html', 'utf8');
const htmlResumePageMock = fs.readFileSync('./test/resume-page.html', 'utf8');
const resumeLinksMock = [
  'https://www.work.ua/resumes/5491825/',
  'https://www.work.ua/resumes/478353/',
  'https://www.work.ua/resumes/3862119/',
  'https://www.work.ua/resumes/3528680/',
  'https://www.work.ua/resumes/5439467/',
  'https://www.work.ua/resumes/5543608/',
  'https://www.work.ua/resumes/2442718/',
  'https://www.work.ua/resumes/5426975/',
  'https://www.work.ua/resumes/5054061/',
  'https://www.work.ua/resumes/3602988/',
  'https://www.work.ua/resumes/5543580/',
  'https://www.work.ua/resumes/2876085/',
  'https://www.work.ua/resumes/5523744/',
  'https://www.work.ua/resumes/3924184/',
];
const resumeCommonDataMock = {
  fullName: 'Дубченко Анна Юрьевна',
  salary: '20 000 грн',
  position: ['PR-manager', 'SMM-менеджер'],
  availability: 'Повна зайнятість, неповна зайнятість, дистанційна робота.',
  personal: ['Вік:', '22 роки', 'Місто:', 'Одеса', 'Готовий до переїзду в:', 'Київ'],
};

describe('parser', () => {
  it('should parse resume list and return pages count number', () => {
    const dom = getDom(htmlPageMock);
    expect(getPagesCount(dom)).toEqual(1475);
  });

  it('should return proper links to resumes from page', () => {
    const dom = getDom(htmlPageMock);
    expect(getPageResumeLinks(dom)).toEqual(resumeLinksMock);
  });

  it('should parse common data', () => {
    const dom = getDom(htmlResumePageMock);
    expect(parseCommonData(dom)).toEqual(resumeCommonDataMock);
  });

  it('should parse resume data', () => {
    const dom = getDom(htmlResumePageMock);
    expect(parseResumeData(dom)).toEqual(resumeCommonDataMock);
  });
});
