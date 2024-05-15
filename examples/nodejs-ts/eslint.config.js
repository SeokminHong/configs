import config from '@seokminhong/configs/eslint';

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
