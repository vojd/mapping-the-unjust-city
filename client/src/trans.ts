const translations = {
  'about_map': {
    'en': 'About',
    'se': 'Om centrumkartan'
  },
  'about_us': {
    'en': 'Contact',
    'se': 'Om oss'
  },
  'about_company': {
    'en': 'Company info',
    'se': 'Om bolaget'
  },
  'zoning_plan': {
    'en': 'Zoning plan',
    'se': 'Detaljplan'
  },
  'owner_history': {
    'en': 'Ownership history',
    'se': 'Ägarhistorik'
  },
  'about_centre': {
    'en': 'Center info',
    'se': 'Om centrum'
  },
  'owns_the_following': {
    'en': 'owns the following',
    'se': 'äger följande'
  }
};

export const trans = (str: string, lang: string): string => {
  return translations[str][lang];
};
