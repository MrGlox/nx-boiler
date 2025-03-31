/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    join(
      'apps/web/src',
      '{src,pages,components,app}/**/*!(*.stories|*.spec).{ts,tsx,html}',
    ),
    ...createGlobPatternsForDependencies('apps/web/src'),
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
};
