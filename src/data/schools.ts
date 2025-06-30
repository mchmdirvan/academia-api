export type School = {
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

export const dataSchools: School[] = [
  {
    id: 1,
    name: "SMAN 51 JAKARTA",
    npsn: "20103312",
    address: "JL. BATU AMPAR 3 CONDET",
    provinceId: "010000",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400",
    city: "Kota Jakarta Timur",
    subdistrictId: "016405",
    subdistrict: "Kec. Kramat Jati",
  },
  {
    id: 2,
    name: "SMAN 62 JAKARTA",
    npsn: "20103306",
    address: "JL. RAYA BOGOR KM.20",
    provinceId: "010000",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400",
    city: "Kota Jakarta Timur",
    subdistrictId: "016405",
    subdistrict: "Kec. Kramat Jati",
  },
  {
    id: 3,
    name: "SMAN 104 JAKARTA",
    npsn: "20103306",
    address: "JL. H. TAIMAN BARAT KEL.GEDONG,JAKARTA TIMUR",
    provinceId: "010000",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400",
    city: "Kota Jakarta Timur",
    subdistrictId: "016401",
    subdistrict: "Kec. Pasar Rebo",
  },

  {
    id: 4,
    name: "SMAS GLOBAL ISLAMIC SCHOOL",
    npsn: "20107589",
    address: "JL. CONDET RAYA NO.5",
    provinceId: "010000",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400",
    city: "Kota Jakarta Timur",
    subdistrictId: "016405",
    subdistrict: "Kec. Kramat Jati",
  },
  {
    id: 5,
    name: "SMAN 88 JAKARTA",
    npsn: "20103300",
    address: "JL. SAWO",
    provinceId: "010000",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400",
    city: "Kota Jakarta Timur",
    subdistrictId: "016401",
    subdistrict: "Kec. Pasar Rebo",
  },
  {
    id: 6,
    name: "SMAN 39 JAKARTA",
    npsn: "20103296",
    address: "JL. RA FADILAH CIJANTUNG",
    provinceId: "010000",
    province: "Prov. D.K.I. Jakarta",
    cityId: "016400",
    city: "Kota Jakarta Timur",
    subdistrictId: "016401",
    subdistrict: "Kec. Pasar Rebo",
  },
];
