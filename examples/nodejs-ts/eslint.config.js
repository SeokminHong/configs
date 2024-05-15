import config from '@seokminhong/eslint';

export default [
  ...config({
    restrictedSyntaxes: [
      {
        selector: ':matches(ImportNamespaceSpecifier)',
        message: 'Import/export only modules you need',
      },
    ],
  }),
];
