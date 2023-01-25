/* istanbul ignore file */
// eslint-disable-next-line import/prefer-default-export
export function createURLFromPath(path: string): string {
  if (typeof window !== "undefined") {
    return window.location.origin + path;
  }
  return `https://localhost${path}`;
}

export function ensureAbsoluteURL(relativeOrAbsoluteURL: string): string {
  return relativeOrAbsoluteURL.startsWith("https")
    ? relativeOrAbsoluteURL
    : createURLFromPath(relativeOrAbsoluteURL);
}

export function getLocationHref(): string {
  if (typeof window !== "undefined") {
    return window.location.href;
  }
  return "";
}

export function getRedirectURL(path: string = ""): string {
  if (typeof window !== "undefined") {
    const currentOrigin = window.location.origin;
    return `${currentOrigin}/${path}`;
  }

  return "";
}

export function getNavigatorLanguages(selectedLocale?: string | string[]): string[] {
  if (typeof navigator === "undefined") {
    return ["en-US"];
  }
  if (!selectedLocale) {
    const storedLanguage = localStorage.getItem("locale");
    return storedLanguage
      ? [storedLanguage, ...navigator.languages]
      : [...navigator.languages];
  }
  return Array.isArray(selectedLocale)
    ? selectedLocale.concat([...navigator.languages])
    : [selectedLocale, ...navigator.languages];
}

export function prefersDarkModeScheme(): boolean {
  if (typeof localStorage !== "undefined" && localStorage.getItem("darkMode")) {
    return localStorage.getItem("darkMode") === "true";
  }
  if (
    typeof window !== "undefined" &&
    typeof window.matchMedia !== "undefined"
  ) {
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  }
  return false;
}
