const MOCKPROPERTY = [
  {
    id: 61,
    title: "Test property 2",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price_per_month: 30.0,
    no_of_rooms: 7,
    property_type: "residential",
    user_id: 1,
    net_size: 2,
    net_size_in_sqr_feet: 71.1664,
    mrt_line: null,
    is_favourite: true,
    image_url:
      "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBRdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7d1986b8b107cbca8688a1c29109af818c698652/images.jpeg",
    address: {
      id: 62,
      city_name: "Taipei city",
      district_name: "Zhongzheng",
      city_id: 1,
      district_id: 1,
    },
  },
  {
    id: 62,
    title: "Test property 3",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
    price_per_month: 30.0,
    no_of_rooms: 7,
    property_type: "residential",
    user_id: 1,
    net_size: 2,
    net_size_in_sqr_feet: 71.1664,
    mrt_line: null,
    is_favourite: true,
    image_url:
      "/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBRdz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--7d1986b8b107cbca8688a1c29109af818c698652/images.jpeg",
    address: {
      id: 62,
      city_name: "Taipei city",
      district_name: "Zhongzheng",
      city_id: 1,
      district_id: 1,
    },
  },
];

const MOCKPAGINATIONDATA = {
  per_page: 10,
  current_page: 1,
  next_page: 2,
  prev_page: null,
  total_pages: 3,
  total_count: 27,
};

export { MOCKPROPERTY, MOCKPAGINATIONDATA };
