// Unified Theme System - Compatible with Alpine.js
document.addEventListener("DOMContentLoaded", applyTheme);
document.addEventListener("livewire:navigated", applyTheme);
window.addEventListener("popstate", applyTheme);

function applyTheme() {
    const themeToggle = document.getElementById("theme-toggle");
    const themeToggleLight = document.getElementById("theme-toggle-light");
    const themeToggleDark = document.getElementById("theme-toggle-dark");

    function setTheme(isDark) {
        if (isDark) {
            document.documentElement.classList.add("dark");
            localStorage.setItem("darkMode", "true");
            if (themeToggleLight && themeToggleDark) {
                themeToggleLight.classList.remove("hidden");
                themeToggleDark.classList.add("hidden");
            }
        } else {
            document.documentElement.classList.remove("dark");
            localStorage.setItem("darkMode", "false");
            if (themeToggleLight && themeToggleDark) {
                themeToggleDark.classList.remove("hidden");
                themeToggleLight.classList.add("hidden");
            }
        }

        // Sync with Alpine.js if available
        if (window.Alpine && window.Alpine.store) {
            try {
                // Update Alpine store if it exists
                if (window.Alpine.store('darkMode') !== undefined) {
                    window.Alpine.store('darkMode', isDark);
                }
            } catch (error) {
                // Silently handle cases where Alpine store doesn't exist
            }
        }

        // Update theme-color meta tag
        updateThemeColor(isDark);
    }

    function updateThemeColor(isDark) {
        const metaThemeColor = document.querySelector('meta[name="theme-color"]');
        if (metaThemeColor) {
            metaThemeColor.setAttribute('content', isDark ? '#0f172a' : '#ffffff');
        }
    }

    // Get saved theme with backward compatibility
    function getSavedTheme() {
        // First check for new format (darkMode boolean)
        const darkMode = localStorage.getItem("darkMode");
        if (darkMode !== null) {
            return JSON.parse(darkMode);
        }

        // Backward compatibility: check old format (theme string)
        const oldTheme = localStorage.getItem("theme");
        if (oldTheme === "dark") {
            // Migrate to new format
            localStorage.setItem("darkMode", "true");
            localStorage.removeItem("theme");
            return true;
        } else if (oldTheme === "light") {
            // Migrate to new format
            localStorage.setItem("darkMode", "false");
            localStorage.removeItem("theme");
            return false;
        }

        // No saved theme found
        return null;
    }

    // Apply theme based on saved preference or system preference
    const savedTheme = getSavedTheme();
    if (savedTheme !== null) {
        setTheme(savedTheme);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        setTheme(true);
    } else {
        setTheme(false);
    }

    // Add event listener for the theme toggle button
    if (themeToggle && !themeToggle.dataset.listenerAdded) {
        themeToggle.addEventListener("click", () => {
            const isDark = document.documentElement.classList.contains("dark");
            setTheme(!isDark);
        });
        themeToggle.dataset.listenerAdded = true;
    }

    // Listen for storage changes to sync across tabs
    window.addEventListener('storage', (e) => {
        if (e.key === 'darkMode' && e.newValue !== null) {
            const isDark = JSON.parse(e.newValue);
            setTheme(isDark);
        }
    });
}

// Watch for system preference changes
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    // Only apply system preference if no user preference is saved
    if (!localStorage.getItem('darkMode')) {
        setTheme(e.matches);
    }
}); 