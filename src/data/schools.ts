type Schools = {
  id: number;
  name: string;
  address: string;
  province_id: string;
  province: string;
  city_id: string;
  city: string;
  subdistrict_id: string;
  subdistrict: string;
  npsn: string;
};

export const schools: Schools[] = [
  {
    id: 1,
    name: "SMAN 51 JAKARTA",
    npsn: "20103312",
    address: "JL. BATU AMPAR 3 CONDET",
    province_id: "010000  ",
    province: "Prov. D.K.I. Jakarta",
    city_id: "016400  ",
    city: "Kota Jakarta Timur",
    subdistrict_id: "016405  ",
    subdistrict: "Kec. Kramat Jati",
  },
  {
    id: 2,
    name: "SMAN 62 JAKARTA",
    npsn: "20103306",
    address: "JL. RAYA BOGOR KM.20",
    province_id: "010000  ",
    province: "Prov. D.K.I. Jakarta",
    city_id: "016400  ",
    city: "Kota Jakarta Timur",
    subdistrict_id: "016405  ",
    subdistrict: "Kec. Kramat Jati",
  },
  {
    id: 3,
    name: "SMAN 104 JAKARTA",
    npsn: "20103306",
    address: "JL. H. TAIMAN BARAT KEL.GEDONG,JAKARTA TIMUR",
    province_id: "010000  ",
    province: "Prov. D.K.I. Jakarta",
    city_id: "016400  ",
    city: "Kota Jakarta Timur",
    subdistrict_id: "016401  ",
    subdistrict: "Kec. Pasar Rebo",
  },
];
