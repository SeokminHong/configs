// @ts-check
import jsxExtension from '../extensions/jsx.js';
import reactExtension from '../extensions/react.js';
import storybookExtension from '../extensions/storybook.js';

/**
 * @typedef {{
 *   mode?: import('../types').PresetMode;
 *   performance?: import('../types').PerformanceProfile;
 *   ignoredRules?: string[];
 * }} BasePresetOptions
 */

/**
 * @param {BasePresetOptions} options
 * @returns {import('../types').PerformanceProfile | undefined}
 */
function resolvePerformance(options) {
  const { mode, performance } = options;

  if (performance !== undefined) {
    return performance;
  }

  if (mode === 'full') {
    return 'ci';
  }

  if (mode === 'light') {
    return 'local';
  }

  if (mode !== undefined) {
    throw new TypeError(`Unknown ESLint preset mode: ${mode}`);
  }

  return performance;
}

/**
 * @param {import('../types').Preset} preset
 * @returns {import('../types').Preset}
 */
export function definePreset(preset) {
  return preset;
}

/**
 * @param {{
 *   envs?: (keyof import('globals'))[];
 * } & BasePresetOptions} [options]
 * @returns {import('../types').Preset}
 */
export function node(options = {}) {
  const { envs = ['nodeBuiltin'], mode, performance, ignoredRules } = options;
  const baseOptions = { mode, performance, ignoredRules };

  return definePreset({
    envs,
    performance: resolvePerformance(baseOptions),
    ignoredRules,
  });
}

/**
 * @param {{
 *   envs?: (keyof import('globals'))[];
 * } & BasePresetOptions} [options]
 * @returns {import('../types').Preset}
 */
export function browser(options = {}) {
  const { envs = ['browser'], mode, performance, ignoredRules } = options;
  const baseOptions = { mode, performance, ignoredRules };

  return definePreset({
    envs,
    performance: resolvePerformance(baseOptions),
    ignoredRules,
  });
}

/**
 * @param {{
 *   envs?: (keyof import('globals'))[];
 * } & BasePresetOptions} [options]
 * @returns {import('../types').Preset}
 */
export function jsx(options = {}) {
  const { envs = ['browser'], mode, performance, ignoredRules } = options;
  const baseOptions = { mode, performance, ignoredRules };

  return definePreset({
    envs,
    performance: resolvePerformance(baseOptions),
    ignoredRules,
    extensions: [jsxExtension()],
  });
}

/**
 * @param {{
 *   envs?: (keyof import('globals'))[];
 *   allowConstantExport?: boolean;
 *   reactRouter?: boolean;
 *   supportsConstantExport?: boolean;
 * } & BasePresetOptions} [options]
 * @returns {import('../types').Preset}
 */
export function react(options = {}) {
  const {
    envs = ['browser'],
    mode,
    performance,
    ignoredRules,
    ...reactOptions
  } = options;
  const baseOptions = { mode, performance, ignoredRules };

  return definePreset({
    envs,
    performance: resolvePerformance(baseOptions),
    ignoredRules,
    extensions: [reactExtension(reactOptions)],
  });
}

/**
 * @param {{
 *   react?: boolean;
 * } & BasePresetOptions} [options]
 * @returns {import('../types').Preset}
 */
export function storybook(options = {}) {
  const { mode, performance, ignoredRules, ...storybookOptions } = options;
  const baseOptions = { mode, performance, ignoredRules };

  return definePreset({
    performance: resolvePerformance(baseOptions),
    ignoredRules,
    extensions: [storybookExtension(storybookOptions)],
  });
}
