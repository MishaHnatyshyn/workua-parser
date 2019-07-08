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
    ['Додаткова освіта', 'additionalEducation'],
    ['Професійні та інші навички', 'skills'],
    ['Рекомендації', 'recommendations']
  ]
);

const URL_REGEXP = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/ig;


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
        company: arr[index + 1].split('\n')[2].trim(),
        description: arr[index + 2]
          .split('\n')
          .map(i => i.replace(/\s+/g, ' ')
            .trim()
            .replace(/^TITLE:.+/g, ''))
          .join('\n'),
      });
    }
    return acc;
  }, []);

const prettifyEducationSection = educationSection => educationSection
  .reduce((acc, curr, index, arr) => {
    if (curr.indexOf('TITLE:') >= 0) {
      acc.push({
        university: curr.replace('TITLE:', ''),
        department: arr[index + 1].split('\n').filter(i => i)[0].trim(),
        type: arr[index + 1].split('\n').filter(i => i)[1].split(',')[0].trim(),
        time: arr[index + 1].split('\n').filter(i => i)[1].split(',')[1].trim(),
        profession: arr[index + 2].replace(/\n/g, ', ').replace(/\s+/g, ' ').replace(/^TITLE:.+/g, '')
      });
    }
    return acc;
  }, []);

const prettifyCommon = dataSection => dataSection
  .join(' ')
  .split('\n')
  .map(_ => _
    .replace(/,\s*$/, '')
    .replace('Зберегти у відгуки', '')
    .replace('Уже у відгуках', '')
    .replace('[відкрити контакти]', '')
    .replace('(див. вище в блоці «контактна інформація»)', '')
    .replace(URL_REGEXP, '')
    .replace(/\\u[0-9]{4}/g, '')
    .trim())
  .filter(_ => _.length);


const prettify = (title, data) => {
  if (title === 'experience') return prettifyExperienceSection(data);
  if (title === 'education') return prettifyEducationSection(data);
  return prettifyCommon(data);
};

const prettifyResumeData = resumeData => resumeData.map((section) => {
  const titleName = resumeDataDictionary.get(section.title);
  return {
    [titleName]: prettify(titleName, section.data)
  };
});

const asyncMap = async (array, callback) => {
  const mappedArray = [];
  for (let i = 0; i < array.length; i++) {
    mappedArray[i] = await callback(array[i], i, array);
  }
  return mappedArray;
};

const asyncForEach = async (array, callback) => {
  for (let i = 0; i < array.length; i++) {
    const status = await callback(array[i], i, array);
    if (status === 'break') break;
  }
};

module.exports = {
  prettifyEducationSection,
  createPersonalDataTable,
  prettifyExperienceSection,
  prettifyResumeData,
  prettifyCommon,
  asyncMap,
  asyncForEach
};
