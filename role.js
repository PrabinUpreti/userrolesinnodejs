const ROLE = {
  ADMIN: "admin",
  BASIC: "basic",
};

module.exports = {
  ROLE: ROLE,
  users: [
    { id: 1, name: "prabin", role: ROLE.ADMIN },
    { id: 2, name: "pratima", role: ROLE.BASIC },
    { id: 3, name: "pravash", role: ROLE.BASIC },
  ],
  projects: [
    { id: 1, name: "prabin's Project", userId: 1 },
    { id: 2, name: "pratima's Project", userId: 2 },
    { id: 3, name: "pravash's Project", userId: 3 },
  ],
};
