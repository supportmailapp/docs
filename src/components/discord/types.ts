/** Shared types for the drawn Discord Components V2 parts. */

export type DiscordButtonStyle = "primary" | "secondary" | "success" | "danger" | "link";

export interface DiscordButton {
  label: string;
  style: DiscordButtonStyle;
  /** Unicode emoji shown before the label. */
  emoji?: string;
}

/**
 * Accent colours the bot uses, from `Colors` in v2/src/utils/enums.ts.
 * Pass one of these names (preferred, keeps docs in sync with the bot) or any CSS colour.
 */
export const botColors = {
  info: "#5edefe",
  success: "#66ff66",
  error: "#ff3434",
  orange: "#ff9900",
} as const;

export type BotColorName = keyof typeof botColors;

export function resolveAccent(accent?: string): string | undefined {
  if (!accent) return undefined;
  return accent in botColors ? botColors[accent as BotColorName] : accent;
}
