// This is used if there's a data need to be available first
export const partial = (fn, ...args) => fn.bind(null, ...args);

const _pipe = (firstFn, secondFn) => (...args) => secondFn(firstFn(...args));

// this is used for piping functions
export const pipe = (...fns) => fns.reduce(_pipe);
