export const patterns = {
  hex: {
    name: 'Hex colour',
    description: 'e.g. #fff or #ffffff',
    regex: '^#?([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$'
  },
  url: {
    name: 'URL',
    description: 'e.g. https://www.airtable.com',
    regex: '(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})'
  }
};

const getPattern = (key) => {
  return patterns[key] || {};
};

export default getPattern;
