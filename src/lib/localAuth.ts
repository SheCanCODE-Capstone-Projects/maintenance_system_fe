export type AccountRole = "customer" | "technician" | "company";

export type LocalAccount = {
  email: string;
  password: string;
  role: AccountRole;
  name: string;
};

const accountsKey = "maintenance-hub-accounts";

function getAccounts(): LocalAccount[] {
  try {
    return JSON.parse(window.localStorage.getItem(accountsKey) ?? "[]") as LocalAccount[];
  } catch {
    return [];
  }
}

export function saveLocalAccount(account: LocalAccount) {
  const accounts = getAccounts().filter(item => item.email.toLowerCase() !== account.email.toLowerCase());
  window.localStorage.setItem(accountsKey, JSON.stringify([...accounts, account]));
}

export function findLocalAccount(email: string, password: string) {
  return getAccounts().find(account => account.email.toLowerCase() === email.toLowerCase() && account.password === password);
}
