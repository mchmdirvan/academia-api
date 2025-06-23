type Schools = {
  id: number;
  name: string;
  npsn: string;
  address: string;
  provinceId: string;
  province: string;
  cityId: string;
  city: string;
  subdistrictId: string;
  subdistrict: string;
};

export const schools: Schools[] = [
  {
    id: 1,
    name: "SMAN 51 JAKARTA",
    npsn: "20103312",
    address: "JL. BATU AMPAR 3 CONDET",
    provinceId: "010000  ",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400  ",
    city: "Kota Jakarta Timur",
    subdistrictId: "016405  ",
    subdistrict: "Kec. Kramat Jati",
  },
  {
    id: 2,
    name: "SMAN 62 JAKARTA",
    npsn: "20103306",
    address: "JL. RAYA BOGOR KM.20",
    provinceId: "010000  ",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400  ",
    city: "Kota Jakarta Timur",
    subdistrictId: "016405  ",
    subdistrict: "Kec. Kramat Jati",
  },
  {
    id: 3,
    name: "SMAN 104 JAKARTA",
    npsn: "20103306",
    address: "JL. H. TAIMAN BARAT KEL.GEDONG,JAKARTA TIMUR",
    provinceId: "010000  ",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400  ",
    city: "Kota Jakarta Timur",
    subdistrictId: "016401  ",
    subdistrict: "Kec. Pasar Rebo",
  },
];
