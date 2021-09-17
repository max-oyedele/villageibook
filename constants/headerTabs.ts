/*********
 * show means tab display against user's role
 * 4 roles: visitor / user / member / admin
 * 
 */
export const tabs = [
  {
    id: 0,
    name: "Browse Villages",
    path: "/",
    shows: ["visitor", "user", "member", "admin"]
  },
  {
    id: 1,
    name: "My Pages",
    path: "/mypages",
    shows: ["user", "member", "admin"]
  },
  {
    id: 2,
    name: "Graduates",
    path: "/graduates",
    shows: ["user", "member", "admin"]
  },
  {
    id: 3,
    name: "Society",
    path: "/society",
    shows: ["user", "member", "admin"]
  },
  {
    id: 4,
    name: "Personalities",
    path: "/personalities",
    shows: ["user", "member", "admin"]
  },
  {
    id: 5,
    name: "Institutions",
    path: "/institutions",
    shows: ["user", "member", "admin"]
  },
  {
    id: 6,
    name: "Videos",
    path: "/videos",
    shows: ["visitor", "user", "member", "admin"]
  },
];