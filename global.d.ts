export declare global {
  var StarlightThemeProvider: {
    updatePickers: (theme?: string) => void;
    /** Picker mode for a stored value: null -> "dark", "" -> "auto". */
    modeOf: (stored: string | null) => "dark" | "light" | "auto";
    /** Current system colour scheme. */
    systemTheme: () => "dark" | "light";
  };
}
