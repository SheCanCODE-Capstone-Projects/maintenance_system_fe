const storageKey = "maintenance-hub-categories";
const defaults = ["Plumbing", "Electrical", "Carpentry", "Painting", "Cleaning", "Mechanical", "General Maintenance"];

export function getCategories() {
  if (typeof window === "undefined") return defaults;
  try {
    const value = JSON.parse(window.localStorage.getItem(storageKey) ?? "[]");
    return Array.isArray(value) && value.length ? value : defaults;
  } catch { return defaults; }
}

export function saveCategories(categories: string[]) {
  window.localStorage.setItem(storageKey, JSON.stringify(categories));
}
