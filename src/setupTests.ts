import '@testing-library/jest-dom';

global.fetch = (args: any) =>
  Promise.resolve({
    ok: true,
    json: () => { },
    text: () => { },
    ...args,
  }) as Promise<Response>;

global.ResizeObserver = class ResizeObserver {
  observe() { }
  unobserve() { }
  disconnect() { }
};

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () { },
      removeListener: function () { },
    };
  };

jest.mock('framer-motion', () => {
  const React = require('react');
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      div: React.forwardRef(({ children, whileHover, whileTap, layoutId, initial, animate, exit, transition, variants, ...props }: any, ref: any) =>
        React.createElement('div', { ...props, ref }, children),
      ),
      button: React.forwardRef(({ children, whileHover, whileTap, layoutId, initial, animate, exit, transition, variants, ...props }: any, ref: any) =>
        React.createElement('button', { ...props, ref }, children),
      ),
      img: React.forwardRef(({ children, whileHover, whileTap, layoutId, initial, animate, exit, transition, variants, ...props }: any, ref: any) =>
        React.createElement('img', { ...props, ref }),
      ),
      span: React.forwardRef(({ children, whileHover, whileTap, layoutId, initial, animate, exit, transition, variants, ...props }: any, ref: any) =>
        React.createElement('span', { ...props, ref }, children),
      ),
    },
    AnimatePresence: ({ children }: any) => children,
  };
});
