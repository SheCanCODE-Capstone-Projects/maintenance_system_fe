export type AccountRole = "admin" | "customer" | "technician" | "company";

export type LocalAccount = {
  email: string;
  password: string;
  role: AccountRole;
  name: string;
  approvalStatus?: "pending" | "approved" | "rejected";
};

const accountsKey = "maintenance-hub-accounts";

const adminAccount: LocalAccount = {
  email: "admin@gmail.com",
  password: "Admin123",
  role: "admin",
  name: "Administrator",
};

function getAccounts(): LocalAccount[] {
  try {
    return JSON.parse(window.localStorage.getItem(accountsKey) ?? "[]") as LocalAccount[];
  } catch {
    return [];
  }
}

export function getLocalAccounts() { return getAccounts(); }

export function setAccountApproval(email: string, approvalStatus: NonNullable<LocalAccount["approvalStatus"]>) {
  const accounts = getAccounts().map((account) => account.email.toLowerCase() === email.toLowerCase() ? { ...account, approvalStatus } : account);
  window.localStorage.setItem(accountsKey, JSON.stringify(accounts));
}

export function saveLocalAccount(account: LocalAccount) {
  const accounts = getAccounts().filter(item => item.email.toLowerCase() !== account.email.toLowerCase());
  window.localStorage.setItem(accountsKey, JSON.stringify([...accounts, account]));
}

export function findLocalAccount(email: string, password: string) {
  if (
    email.toLowerCase() === adminAccount.email &&
    password === adminAccount.password
  ) {
    return adminAccount;
  }

  return getAccounts().find(account => account.email.toLowerCase() === email.toLowerCase() && account.password === password);
}
