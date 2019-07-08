const jsdom = require('jsdom');
const request = require('./request-promise');
const { createPersonalDataTable, prettifyResumeData } = require('./parserUtils');

const { JSDOM } = jsdom;

const getPage = (category, page) => request(`https://www.work.ua/resumes-${category}/?page=${page}`);

const wait = ms => new Promise((resolve) => {
  setTimeout(() => {
    resolve();
  }, ms);
});

const fetchResumePage = link => request(link);

const getDom = html => new JSDOM(html);

const getPagesCount = (dom) => {
  const pagesCountElement = dom.window.document.querySelector('.pagination>li:nth-last-child(2)>a');
  if (pagesCountElement === undefined) {
    throw Error('No pages count element');
  }
  const pagesCount = parseInt(pagesCountElement.textContent, 10);
  return pagesCount;
};

const getPageResumeLinks = (dom) => {
  const linksList = dom.window.document.querySelectorAll('.resume-link .row a');
  const linksArray = [...linksList].map(a => `https://www.work.ua${a.href}`);
  return linksArray;
};

const parseResumeInfoBlock = (start) => {
  let curr = start.nextElementSibling;
  const result = [];
  while (curr && curr.nodeName !== 'H2') {
    result.push(curr.nodeName === 'H3' ? `TITLE:${curr.textContent}` : curr.textContent);
    curr = curr.nextElementSibling;
  }
  return result;
};

const parseCommonData = (dom) => {
  const meta = dom.window.document.querySelector('meta[name="Description"]').content.replace(/&nbsp;/g, '');
  const photo = dom.window.document.querySelector('img.border') || { src: '', alt: '' };
  const fullName = dom.window.document.querySelector('h1').textContent
    .trim()
    .replace(/\s+/g, ' ');
  let [salary, ...position] = dom.window.document.querySelector('h2').textContent
    .split(',')
    .reverse()
    .map(item => item.trim());
  if (salary.indexOf('грн') === -1) {
    position.push(salary);
    salary = '';
  } else {
    salary = `${parseInt(salary.replace(/\s/g, ''), 10) / 25 * 1.5}`;
  }
  const availability = dom.window.document.querySelector('h2 + p').textContent;
  const personal = dom.window.document.querySelector('.dl-horizontal').textContent
    .split('\n')
    .filter(item => item.trim())
    .map(item => item.trim());
  return {
    meta,
    photo: {
      url: photo.src ? `https://www.work.ua${photo.src}` : '',
      alt: photo.alt
    },
    fullName: fullName !== 'Особисті дані приховані' ? fullName : 'Hidden',
    salary,
    position,
    availability,
    personal: createPersonalDataTable(personal),
  };
};

const parseResumeData = (dom) => {
  dom.window.document.querySelector('.card .row').remove();
  dom.window.document.querySelector('#contactInfo').remove();
  const resumeDataTitlesElements = [...dom.window.document.querySelectorAll('h2:not([class])')];
  const resumeData = resumeDataTitlesElements.map(part => ({
    title: part.innerHTML,
    data: parseResumeInfoBlock(part)
  }));
  return prettifyResumeData(resumeData);
};

const parseResumePage = (dom) => {
  const common = parseCommonData(dom);
  const resumeData = parseResumeData(dom);
  return {
    ...common,
    ...resumeData.reduce((acc, curr) => ({ ...acc, ...curr }), {})
  };
};

const getResume = async (url) => {
  await wait(1000);
  const html = await fetchResumePage(url);
  const dom = getDom(html);
  const resumeData = parseResumePage(dom);
  return { ...resumeData, link: url };
};


module.exports = {
  getPageResumeLinks,
  getPagesCount,
  getDom,
  getPage,
  createPersonalDataTable,
  parseCommonData,
  parseResumeData,
  parseResumePage,
  wait,
  getResume
};
