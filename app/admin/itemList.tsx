interface IPropItem {
  id: string;
  label: string;
  path: string;
}

let itemList: IPropItem[] = [
  {
    id: `dashboard`,
    label: `DASHBOARD`,
    path: `/admin/dashboard`,
  },
  {
    id: `user`,
    label: `USER`,
    path: `/admin/user`,
  },
  {
    id: `barang`,
    label: `BARANG`,
    path: `/admin/barang`,
  },
  {
    id: `history`,
    label: `HISTORY`,
    path: `/admin/history`,
  },
];

export default itemList;
