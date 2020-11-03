const translations = {
  'about_map': {
    'en': 'About',
    'se': 'Om centrumkartan'
  },
  'about_us': {
    'en': 'Contact',
    'se': 'Om oss'
  },
  'about_centre': {
    'en': 'Center info',
    'se': 'Om centrum'
  },
  'about_company': {
    'en': 'Company info',
    'se': 'Om bolaget'
  },
  'document': {
    'en': 'Document',
    'se': 'Dokument',
  },
  'company': {
    'en': 'Company',
    'se': 'Företag',
  },
  'owner_history': {
    'en': 'Ownership history',
    'se': 'Ägarhistorik'
  },
  'owns_the_following': {
    'en': 'owns the following',
    'se': 'äger följande'
  },
  'year': {
    'en': 'Year',
    'se': 'År'
  },
  'zoning_plan': {
    'en': 'Zoning plan',
    'se': 'Detaljplan'
  },
};

export const trans = (str: string, lang: string): string => {
  return translations[str][lang];
};
