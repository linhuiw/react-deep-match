const escapeRegExp = (s: string) => {
  return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
};

export { escapeRegExp };
