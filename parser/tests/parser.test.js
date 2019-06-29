const {
  parse,
  getPageResumeLinks,
  getPagesCount,
  getDom,
  parseResumeData,
  parseCommonData,
  parseResumePage
} = require('../parser');

const {
  resumePageDataMock,
  resumeDataMock,
  resumeCommonDataMock,
  resumeLinksMock,
  htmlResumePageMock,
  htmlPageMock,
} = require('./mocks/parser.test.data');


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
    expect(parseResumeData(dom)).toEqual(resumeDataMock);
  });

  it('should parse resume page', () => {
    const dom = getDom(htmlResumePageMock);
    expect(parseResumePage(dom)).toEqual(resumePageDataMock);
  });
});
