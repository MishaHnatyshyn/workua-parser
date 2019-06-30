const {
  getDom, getPage, getPageResumeLinks, getResume
} = require('./parser');
const { asyncMap } = require('./parserUtils');
const db = require('../db');

const parse = async () => {
  const pageData = await getPage(1);
  const pageDom = getDom(pageData);
  const resumeLinks = getPageResumeLinks(pageDom);
  const resumes = await asyncMap(resumeLinks.slice(0, 3), async link => getResume(link));
  console.log(JSON.stringify(resumes, null, 2));
};

parse();
