import { IBarang } from "@/app/types";
import { getCookies } from "@/lib/server-cookie";
import { BASE_URL_API } from "@/global";
import { get } from "@/lib/api-bridge";
import Search from "@/components/search";

const getBarang = async (search: string): Promise<IBarang[]> => {
  try {
    const TOKEN = await getCookies("token");
    const url = `${BASE_URL_API}/barang/get?search=${search}`;

    const { data } = await get(url, TOKEN);

    let result: IBarang[] = [];
    if (data?.status) result = [...data.data];

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

const BarangPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const search = await (searchParams.search
    ? searchParams.search.toString()
    : "");

  const barang: IBarang[] = await getBarang(search);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-9">HALAMAN BARANG</h1>

      {/* function button */}
      <div className="w-full mb-5">
        <div className="w-1/3">
          <Search url={`/admin/barang`} search={search} />
        </div>
      </div>

      <div className="w-full overflow-x-auto lg:min-w-full">
        <div className="min-w-[600px]">
          {/* table header */}
          <div className="flex border-b-2">
            <label className="w-2/6 px-3 py-4 lg:text-xl bg-blue-100 font-bold tracking-wide">
              Nama Barang
            </label>
            <label className="w-1/6 px-3 py-4 lg:text-xl bg-green-100 font-bold tracking-wide">
              Harga
            </label>
            <label className="w-1/6 px-3 py-4 lg:text-xl bg-yellow-100 font-bold tracking-wide">
              Stok
            </label>
            <label className="w-2/6 px-3 py-4 lg:text-xl bg-red-100 font-bold tracking-wide">
              Action Button
            </label>
          </div>

          {/* table content */}
          <div className="">
            {barang.map((data, index) => (
              <div key={index} className="py-2 flex">
                <p className="w-2/6 lg:text-xl px-3">{data.namaBarang}</p>
                <p className="w-1/6 lg:text-xl px-4">
                  Rp. {new Intl.NumberFormat("id-ID").format(data.harga)}
                </p>
                <p className="w-1/6 lg:text-xl px-5">{data.stok}</p>
                <p className="w-2/6 lg:text-xl px-3"></p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarangPage;
