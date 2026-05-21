// @ts-check
import { ESLint } from 'eslint';
import prettierConfig from 'eslint-config-prettier';
import { importX } from 'eslint-plugin-import-x';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import reactRefreshPlugin from 'eslint-plugin-react-refresh';
import * as storybookPlugin from 'eslint-plugin-storybook';
import unicornPlugin from 'eslint-plugin-unicorn';
import { builtinRules } from 'eslint/use-at-your-own-risk';
import tseslint from 'typescript-eslint';
import { describe, expect, it } from 'vitest';

import config, { expensiveRules } from '../eslint/index.js';
import {
  browser,
  jsx,
  node,
  react,
  storybook,
} from '../eslint/presets/index.js';

const auditedSurfaces = [
  {
    label: 'TypeScript',
    file: 'src/file.ts',
    fullRules: 374,
    lightRules: 321,
  },
  {
    label: 'TypeScript React',
    file: 'src/file.tsx',
    fullRules: 374,
    lightRules: 321,
  },
  {
    label: 'JavaScript',
    file: 'src/file.js',
    fullRules: 329,
    lightRules: 324,
  },
  {
    label: 'JavaScript React',
    file: 'src/file.jsx',
    fullRules: 329,
    lightRules: 324,
  },
  {
    label: 'Storybook story',
    file: 'src/file.stories.tsx',
    fullRules: 382,
    lightRules: 329,
  },
  {
    label: 'Storybook main',
    file: '.storybook/main.ts',
    fullRules: 373,
    lightRules: 320,
  },
];

const expectedSourceCounts = {
  core: 150,
  typescript: 102,
  importX: 18,
  unicorn: 79,
  jsxA11y: 34,
  react: 35,
  reactHooks: 13,
  reactRefresh: 1,
  storybook: 11,
};

const expectedSpecialPrettierRules = ['curly', 'no-unexpected-multiline'];

const pluginRules = {
  '@typescript-eslint': tseslint.plugin.rules,
  'import-x': importX.rules,
  unicorn: unicornPlugin.rules,
  'jsx-a11y': jsxA11yPlugin.rules,
  react: reactPlugin.rules,
  'react-hooks': reactHooksPlugin.rules,
  'react-refresh': reactRefreshPlugin.rules,
  storybook: storybookPlugin.rules,
};

const typeScriptExtensionBaseRules = Object.entries(tseslint.plugin.rules)
  .filter(([, rule]) => rule.meta?.docs?.extendsBaseRule)
  .map(([ruleId]) => ruleId);

/**
 * @param {import('../eslint/types').PresetMode} mode
 */
function createAuditedEslint(mode) {
  return new ESLint({
    overrideConfigFile: true,
    overrideConfig: config({
      presets: [react({ mode }), storybook({ mode })],
    }),
  });
}

/**
 * @param {import('../eslint/types').PresetMode} mode
 */
async function resolveAuditedConfigs(mode) {
  const eslint = createAuditedEslint(mode);
  const entries = await Promise.all(
    auditedSurfaces.map(async (surface) => [
      surface.label,
      {
        surface,
        resolved: await eslint.calculateConfigForFile(surface.file),
      },
    ]),
  );

  return Object.fromEntries(entries);
}

/**
 * @param {Record<string, import('@typescript-eslint/utils').TSESLint.FlatConfig.Config>} resolvedByLabel
 */
function collectActiveRuleIds(resolvedByLabel) {
  return new Set(
    Object.values(resolvedByLabel)
      .flatMap(({ resolved }) => Object.entries(resolved.rules ?? {}))
      .filter(([, ruleEntry]) => isEnabled(ruleEntry))
      .map(([ruleId]) => ruleId),
  );
}

/**
 * @param {unknown} ruleEntry
 */
function isEnabled(ruleEntry) {
  const level = Array.isArray(ruleEntry) ? ruleEntry[0] : ruleEntry;
  return level !== 0 && level !== 'off';
}

/**
 * @param {string} ruleId
 */
function getPluginRule(ruleId) {
  if (!ruleId.includes('/')) {
    return builtinRules.get(ruleId);
  }

  if (ruleId.startsWith('@typescript-eslint/')) {
    return pluginRules['@typescript-eslint'][
      ruleId.slice('@typescript-eslint/'.length)
    ];
  }

  const separatorIndex = ruleId.indexOf('/');
  const pluginName = ruleId.slice(0, separatorIndex);
  const localRuleId = ruleId.slice(separatorIndex + 1);
  return pluginRules[pluginName]?.[localRuleId];
}

/**
 * @param {string} ruleId
 */
function ruleSource(ruleId) {
  if (!ruleId.includes('/')) {
    return 'core';
  }

  if (ruleId.startsWith('@typescript-eslint/')) {
    return 'typescript';
  }

  if (ruleId.startsWith('import-x/')) {
    return 'importX';
  }

  if (ruleId.startsWith('jsx-a11y/')) {
    return 'jsxA11y';
  }

  if (ruleId.startsWith('react-hooks/')) {
    return 'reactHooks';
  }

  if (ruleId.startsWith('react-refresh/')) {
    return 'reactRefresh';
  }

  return ruleId.slice(0, ruleId.indexOf('/'));
}

describe('ESLint active rule policy', () => {
  it('keeps the documented active rule coverage in full presets', async () => {
    const resolvedByLabel = await resolveAuditedConfigs('full');
    const activeRuleIds = collectActiveRuleIds(resolvedByLabel);

    expect(activeRuleIds.size).toBe(443);
    expect(countRuleSources(activeRuleIds)).toEqual(expectedSourceCounts);

    expect(
      Object.fromEntries(
        Object.values(resolvedByLabel).map(({ surface, resolved }) => [
          surface.label,
          activeRules(resolved).length,
        ]),
      ),
    ).toEqual(
      Object.fromEntries(
        auditedSurfaces.map((surface) => [surface.label, surface.fullRules]),
      ),
    );
  });

  it('resolves every active rule and rejects deprecated rules', async () => {
    const resolvedByLabel = await resolveAuditedConfigs('full');
    const activeRuleIds = [...collectActiveRuleIds(resolvedByLabel)].sort();

    const missingRules = activeRuleIds.filter(
      (ruleId) => !getPluginRule(ruleId),
    );
    const deprecatedRules = activeRuleIds.filter(
      (ruleId) => getPluginRule(ruleId)?.meta?.deprecated,
    );

    expect(missingRules).toEqual([]);
    expect(deprecatedRules).toEqual([]);
  });

  it('does not activate core rules and TypeScript extension rules together', async () => {
    const resolvedByLabel = await resolveAuditedConfigs('full');
    const duplicatePairs = Object.values(resolvedByLabel).flatMap(
      ({ surface, resolved }) => {
        const ruleIds = new Set(activeRules(resolved));
        return typeScriptExtensionBaseRules
          .filter(
            (ruleId) =>
              ruleIds.has(ruleId) &&
              ruleIds.has(`@typescript-eslint/${ruleId}`),
          )
          .map((ruleId) => `${surface.label}: ${ruleId}`);
      },
    );

    expect(duplicatePairs).toEqual([]);
  });

  it('splits TypeScript, JavaScript, and import ownership by surface', async () => {
    const resolvedByLabel = await resolveAuditedConfigs('full');
    const ownershipFailures = Object.values(resolvedByLabel).flatMap(
      ({ surface, resolved }) =>
        checkOwnership(surface.file, activeRules(resolved)),
    );

    expect(ownershipFailures).toEqual([]);
  });

  it('does not activate hard Prettier conflicts', async () => {
    const resolvedByLabel = await resolveAuditedConfigs('full');
    const hardPrettierRules = new Set(
      Object.entries(prettierConfig.rules)
        .filter(([, ruleEntry]) => ruleEntry === 'off')
        .map(([ruleId]) => ruleId),
    );
    const specialPrettierRules = new Set(
      Object.entries(prettierConfig.rules)
        .filter(([, ruleEntry]) => ruleEntry === 0)
        .map(([ruleId]) => ruleId),
    );

    const conflicts = Object.values(resolvedByLabel).flatMap(
      ({ surface, resolved }) =>
        activeRules(resolved)
          .filter((ruleId) => hardPrettierRules.has(ruleId))
          .map((ruleId) => `${surface.label}: ${ruleId}`),
    );
    const activeSpecialRules = [
      ...new Set(
        Object.values(resolvedByLabel).flatMap(({ resolved }) =>
          activeRules(resolved).filter((ruleId) =>
            specialPrettierRules.has(ruleId),
          ),
        ),
      ),
    ].sort();

    expect(conflicts).toEqual([]);
    expect(activeSpecialRules).toEqual(expectedSpecialPrettierRules);
  });

  it('disables every classified expensive rule in light presets', async () => {
    const resolvedByLabel = await resolveAuditedConfigs('light');
    const expensiveRuleIds = new Set(expensiveRules);
    const failures = Object.values(resolvedByLabel).flatMap(
      ({ surface, resolved }) =>
        activeRules(resolved)
          .filter((ruleId) => expensiveRuleIds.has(ruleId))
          .map((ruleId) => `${surface.label}: ${ruleId}`),
    );

    expect(
      Object.fromEntries(
        Object.values(resolvedByLabel).map(({ surface, resolved }) => [
          surface.label,
          activeRules(resolved).length,
        ]),
      ),
    ).toEqual(
      Object.fromEntries(
        auditedSurfaces.map((surface) => [surface.label, surface.lightRules]),
      ),
    );
    expect(failures).toEqual([]);
  });

  it('uses preset modes to control TypeScript project service by default', async () => {
    const [fullConfig, lightConfig] = await Promise.all([
      createAuditedEslint('full').calculateConfigForFile('src/file.ts'),
      createAuditedEslint('light').calculateConfigForFile('src/file.ts'),
    ]);

    expect(fullConfig.languageOptions?.parserOptions?.projectService).toBe(
      true,
    );
    expect(lightConfig.languageOptions?.parserOptions?.projectService).toBe(
      false,
    );
  });

  it('applies node, browser, JSX, and React presets to the expected surfaces', async () => {
    const nodeConfig = await new ESLint({
      overrideConfigFile: true,
      overrideConfig: config({ presets: [node()] }),
    }).calculateConfigForFile('src/file.ts');
    const browserConfig = await new ESLint({
      overrideConfigFile: true,
      overrideConfig: config({ presets: [browser()] }),
    }).calculateConfigForFile('src/file.ts');
    const jsxConfig = await new ESLint({
      overrideConfigFile: true,
      overrideConfig: config({ presets: [jsx()] }),
    }).calculateConfigForFile('src/file.jsx');
    const reactConfig = await new ESLint({
      overrideConfigFile: true,
      overrideConfig: config({ presets: [react()] }),
    }).calculateConfigForFile('src/file.jsx');

    expect(nodeConfig.languageOptions?.globals?.Buffer).toBeDefined();
    expect(browserConfig.languageOptions?.globals?.window).toBeDefined();
    expect(activeRules(jsxConfig)).toContain('jsx-a11y/alt-text');
    expect(
      activeRules(jsxConfig).some((ruleId) => ruleId.startsWith('react/')),
    ).toBe(false);
    expect(activeRules(reactConfig)).toContain('react/jsx-key');
    expect(activeRules(reactConfig)).toContain('jsx-a11y/alt-text');
  });
});

/**
 * @param {Set<string>} ruleIds
 */
function countRuleSources(ruleIds) {
  const counts = Object.fromEntries(
    Object.keys(expectedSourceCounts).map((source) => [source, 0]),
  );

  for (const ruleId of ruleIds) {
    counts[ruleSource(ruleId)] += 1;
  }

  return counts;
}

/**
 * @param {import('@typescript-eslint/utils').TSESLint.FlatConfig.Config} resolved
 */
function activeRules(resolved) {
  return Object.entries(resolved.rules ?? {})
    .filter(([, ruleEntry]) => isEnabled(ruleEntry))
    .map(([ruleId]) => ruleId)
    .sort();
}

/**
 * @param {string} file
 * @param {string[]} ruleIds
 */
function checkOwnership(file, ruleIds) {
  const activeRuleIds = new Set(ruleIds);
  const isTypeScriptSurface = file.endsWith('.ts') || file.endsWith('.tsx');
  const expectedInactive = isTypeScriptSurface
    ? [
        'no-fallthrough',
        '@typescript-eslint/no-unused-vars',
        'import-x/no-deprecated',
        'no-duplicate-imports',
      ]
    : [
        '@typescript-eslint/no-deprecated',
        '@typescript-eslint/no-unused-vars',
        'no-duplicate-imports',
      ];
  const expectedActive = isTypeScriptSurface
    ? ['@typescript-eslint/no-deprecated', 'import-x/no-duplicates']
    : [
        'no-fallthrough',
        'no-unused-vars',
        'import-x/no-deprecated',
        'import-x/no-duplicates',
      ];

  return [
    ...expectedInactive
      .filter((ruleId) => activeRuleIds.has(ruleId))
      .map((ruleId) => `${file}: expected ${ruleId} to be inactive`),
    ...expectedActive
      .filter((ruleId) => !activeRuleIds.has(ruleId))
      .map((ruleId) => `${file}: expected ${ruleId} to be active`),
  ];
}
