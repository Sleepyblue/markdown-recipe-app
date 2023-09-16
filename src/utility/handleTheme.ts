export default function handleTheme(): void {
  const storedTheme = localStorage.getItem("theme");
  const html = document.querySelector("html");

  // Check for stored theme
  if (storedTheme) {
    html?.setAttribute("data-theme", storedTheme);
  } else if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    // If there's no stored theme, but the user's preference is dark, set data-theme to "dark"
    html?.setAttribute("data-theme", "dark");
    // Create theme object in localStorage
    localStorage.setItem("theme", "dark");
  } else {
    // If there's no stored theme and the user's preference is not dark, set data-theme to "light"
    html?.setAttribute("data-theme", "light");
    // Create theme object in localStorage
    localStorage.setItem("theme", "light");
  }
}
