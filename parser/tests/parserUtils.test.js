const {
  createPersonalDataTable,
  prettifyExperienceSection,
  prettifyEducationSection,
  prettifyCommon,
} = require('../parserUtils');

const {
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
} = require('./mocks/parserUtils.test.data');

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

  describe('prettifyEducationSection', () => {
    it('should make readable data structure from array', () => {
      expect(prettifyEducationSection(educationInputData))
        .toEqual(educationOutPutData);
    });
  });

  describe('prettifyCommonSections', () => {
    it('should make readable data structure from array', () => {
      expect(prettifyCommon(commonInputData))
        .toEqual(commonOutputData);
    });

    it('should remove empty elements', () => {
      expect(prettifyCommon(commonInputDataWithEmptyStrings))
        .toEqual(commonOutputDataWithEmptyStrings);
    });
  });
});
