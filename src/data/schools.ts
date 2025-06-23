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
    name: "SMAS PSKD MANDIRI",
    address: "JL. GGSY RATULANGI NO.14",
    province_id: "010000  ",
    province: "Prov. D.K.I. Jakarta",
    city_id: "016000  ",
    city: "Kota Jakarta Pusat",
    subdistrict_id: "016002  ",
    subdistrict: "Kec. Menteng",
    npsn: "20107250",
  },
];
