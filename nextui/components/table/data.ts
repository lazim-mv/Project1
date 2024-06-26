import axios from "axios";

export const columns = [
  { name: "NAME", uid: "name" },
  { name: "Customer", uid: "cusomerName" },
  { name: "Condition", uid: "condition" },
  { name: "Price", uid: "price" },
  { name: "STATUS", uid: "status" },
  { name: "ACTIONS", uid: "actions" },
];

export const fetchDataFromAPI = async () => {
  try {
    const response = await axios.get(
      "https://project1-l1jd.onrender.com/products/admin/api/bikes/"
    );
    console.log("response fetching data:", response.data);
    const data = response.data.map((item, index) => ({
      id: index + 1,
      name: item.title,
      status: item.availabilityStatus ? "In-Stock" : "Out Of Stock",
      avatar: item.image,
      condition: item.condition,
      price: item.price,
      cusomerName: item.customerName ? item.customerName : "Customer Name",
      team: item.customerNumber ? item.customerN : "+xxx xxx xx",
      age: "29",
      email: `${item.year} - ${item.color} - ${
        item.availabilityStatus ? "Sold" : "Un-sold"
      }`,
    }));
    // Now directly update the users variable
    users.splice(0, users.length, ...data);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};

// Initially, users will be an empty array until data is fetched
export let users = [];

// export const users = [
//   {
//     id: 1,
//     name: "Tony Reichert",
//     role: "CEO",
//     team: "Management",
//     status: "active",
//     age: "29",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     email: "tony.reichert@example.com",
//   },
//   {
//     id: 2,
//     name: "Zoey Lang",
//     role: "Technical Lead",
//     team: "Development",
//     status: "paused",
//     age: "25",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     email: "zoey.lang@example.com",
//   },
//   {
//     id: 3,
//     name: "Jane Fisher",
//     role: "Senior Developer",
//     team: "Development",
//     status: "active",
//     age: "22",
//     avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//     email: "jane.fisher@example.com",
//   },
//   {
//     id: 4,
//     name: "William Howard",
//     role: "Community Manager",
//     team: "Marketing",
//     status: "vacation",
//     age: "28",
//     avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//     email: "william.howard@example.com",
//   },
//   {
//     id: 5,
//     name: "Kristen Copper",
//     role: "Sales Manager",
//     team: "Sales",
//     status: "active",
//     age: "24",
//     avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//     email: "kristen.cooper@example.com",
//   },
//   {
//     id: 6,
//     name: "Tony Reichert",
//     role: "CEO",
//     team: "Management",
//     status: "active",
//     age: "29",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     email: "tony.reichert@example.com",
//   },
//   {
//     id: 10,
//     name: "Kristen Copper",
//     role: "Sales Manager",
//     team: "Sales",
//     status: "active",
//     age: "24",
//     avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//     email: "kristen.cooper@example.com",
//   },
//   {
//     id: 8,
//     name: "Jane Fisher",
//     role: "Senior Developer",
//     team: "Development",
//     status: "active",
//     age: "22",
//     avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//     email: "jane.fisher@example.com",
//   },
//   {
//     id: 7,
//     name: "Zoey Lang",
//     role: "Technical Lead",
//     team: "Development",
//     status: "paused",
//     age: "25",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     email: "zoey.lang@example.com",
//   },

//   {
//     id: 9,
//     name: "William Howard",
//     role: "Community Manager",
//     team: "Marketing",
//     status: "vacation",
//     age: "28",
//     avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
//     email: "william.howard@example.com",
//   },
//   {
//     id: 11,
//     name: "Tony Reichert",
//     role: "CEO",
//     team: "Management",
//     status: "active",
//     age: "29",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     email: "tony.reichert@example.com",
//   },
//   {
//     id: 12,
//     name: "Kristen Copper",
//     role: "Sales Manager",
//     team: "Sales",
//     status: "active",
//     age: "24",
//     avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//     email: "kristen.cooper@example.com",
//   },
//   {
//     id: 13,
//     name: "Jane Fisher",
//     role: "Senior Developer",
//     team: "Development",
//     status: "active",
//     age: "22",
//     avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
//     email: "jane.fisher@example.com",
//   },
//   {
//     id: 14,
//     name: "Zoey Lang",
//     role: "Technical Lead",
//     team: "Development",
//     status: "paused",
//     age: "25",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
//     email: "zoey.lang@example.com",
//   },
//   {
//     id: 15,
//     name: "Tony Reichert",
//     role: "CEO",
//     team: "Management",
//     status: "active",
//     age: "29",
//     avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
//     email: "tony.reichert@example.com",
//   },
//   {
//     id: 16,
//     name: "Kristen Copper",
//     role: "Sales Manager",
//     team: "Sales",
//     status: "active",
//     age: "24",
//     avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
//     email: "kristen.cooper@example.com",
//   },
// ];
