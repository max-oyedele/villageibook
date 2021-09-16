/*********
 * show means tab display against user's role
 * 4 roles: visitor / member / premium / admin
 * 
 */
export const tabs = [
  {
    id: 0,
    name: "Browse Villages",
    path: "/",
    shows: ["visitor", "member", "premium", "admin"]
  },
  {
    id: 1,
    name: "My Pages",
    path: "/mypages",
    shows: ["member", "premium", "admin"]
  },
  {
    id: 2,
    name: "Graduates",
    path: "/graduates",
    shows: ["member", "premium", "admin"]
  },
  {
    id: 3,
    name: "Society",
    path: "/society",
    shows: ["member", "premium", "admin"]
  },
  {
    id: 4,
    name: "Personalities",
    path: "/personalities",
    shows: ["member", "premium", "admin"]
  },
  {
    id: 5,
    name: "Institutions",
    path: "/institutions",
    shows: ["member", "premium", "admin"]
  },
  {
    id: 6,
    name: "Videos",
    path: "/videos",
    shows: ["visitor", "member", "premium", "admin"]
  },
];