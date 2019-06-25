const personalDataDictionary = new Map(
  [
    ['Вік:', 'age'],
    ['Місто:', 'city'],
    ['Готовий до переїзду в:', 'relocation']
  ]
);

const resumeDataDictionary = new Map(
  [
    ['Досвід роботи', 'experience'],
    ['Освіта', 'education'],
    ['Додаткова інформація', 'additionalInfo'],
    ['Знання мов', 'languages'],
    ['Додаткова освіта', 'additionalEducation']
  ]
);

const createPersonalDataTable = array => array.reduce((acc, curr, index, arr) => {
  if (personalDataDictionary.has(curr)) {
    acc[personalDataDictionary.get(curr)] = arr[index + 1];
  }
  return acc;
}, {});

const prettifyExperienceSection = experienceSection => experienceSection
  .reduce((acc, curr, index, arr) => {
    if (curr.indexOf('TITLE:') >= 0) {
      acc.push({
        position: curr.replace('TITLE:', ''),
        time: arr[index + 1].split('\n')[0].trim(),
        company: arr[index + 2],
        description: arr[index + 3],
      });
    }
    return acc;
  }, []);

const prettifyResumeData = (resumeData) => {

};

module.exports = {
  createPersonalDataTable,
  prettifyExperienceSection,
};
