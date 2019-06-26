const jsdom = require('jsdom');
const request = require('../request-promise');
const { createPersonalDataTable, prettifyResumeData } = require('./parserUtils');

const { JSDOM } = jsdom;

const getPage = page => request(`https://www.work.ua/resumes-it/?page=${page}`);

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

const parse = async () => {
  const pageData = await getPage(1);
  const pageDom = getDom(pageData);
  // const pagesCount = getPagesCount(pageDom);
  const pagesCount = 1;
  const pagesPromiseArray = [...new Array(pagesCount)].map((_, i) => getPage(i + 1));
  await Promise.all(pagesPromiseArray).then(res => console.log(res));
  console.log(pagesCount);
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
  const photo = dom.window.document.querySelector('img.border');
  const fullName = dom.window.document.querySelector('h1').textContent
    .trim()
    .replace(/\s+/g, ' ');
  const [salary, ...position] = dom.window.document.querySelector('h2').textContent
    .split(',')
    .reverse()
    .map(item => item.trim());
  const availability = dom.window.document.querySelector('h2 + p').textContent;
  const personal = dom.window.document.querySelector('.dl-horizontal').textContent
    .split('\n')
    .filter(item => item.trim())
    .map(item => item.trim());
  return {
    photo: {
      url: `https://www.work.ua${photo.src}`,
      alt: photo.alt
    },
    fullName,
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


module.exports = {
  parse,
  getPageResumeLinks,
  getPagesCount,
  getDom,
  getPage,
  createPersonalDataTable,
  parseCommonData,
  parseResumeData,
  parseResumePage
};
