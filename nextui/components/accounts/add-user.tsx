import {
  Button,
  Divider,
  Input,
  Modal,
  Text,
  Dropdown,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
// DropdownTrigger,
import React from "react";
import { Flex } from "../styles/flex";
import axios from "axios";
import { fetchDataFromAPI } from "../table/data";

export const Add = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  const [visible, setVisible] = React.useState(false);
  const handler = () => setVisible(true);

  const closeHandler = () => {
    setVisible(false);
    console.log("closed");
  };

  const [bikeData, setBikeData] = React.useState({
    title: "",
    description: "",
    year: null,
    price: null,
    condition: "",
    availabilityStatus: false,
    color: "",
    category: "", // Added category property
    image: null,
    customerName: "",
    customerNumber: 0,
  });
  const [imagePreview, setImagePreview] = React.useState(null);

  const handleChange = (e) => {
    setBikeData({ ...bikeData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = (e) => {
    setBikeData({ ...bikeData, [e.target.name]: e.target.checked });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setBikeData({ ...bikeData, image: reader.result });
      setImagePreview(reader.result);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  console.log(bikeData, "bikeData");

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", bikeData.image);
      formData.append("title", bikeData.title);
      formData.append("description", bikeData.description);
      formData.append("year", bikeData.year);
      formData.append("price", bikeData.price);
      formData.append("condition", bikeData.condition);
      formData.append("availabilityStatus", bikeData.availabilityStatus);
      formData.append("color", bikeData.color);
      formData.append("category", bikeData.category);
      formData.append("customerName", bikeData.customerName);
      formData.append("customerNumber", bikeData.customerNumber);

      const response = await axios.post(
        "http://localhost:3001/products/admin/api/bikes/",
        formData
      );

      if (response.status === 200) {
        console.log("Bike added successfully.");
        setVisible(false);
        console.log("Sending data:", Object.fromEntries(formData.entries()));
        fetchDataFromAPI();

        setBikeData({
          title: "",
          description: "",
          year: null,
          price: null,
          condition: "",
          availabilityStatus: false,
          color: "",
          category: "",
          image: null,
          purchaseDate: "",
          soldDate: "",
          listingAddedDate: "",
          customerName: "",
          customerNumber: "",
        });

        setImagePreview(null);
      } else {
        console.error(
          "Error adding bike: Unexpected status code",
          response.status
        );
      }
    } catch (error) {
      console.error("Error adding bike:", error);
    }
  };

  return (
    <div>
      <Button auto onClick={handler}>
        Add
      </Button>
      <Modal
        closeButton
        aria-labelledby="modal-title"
        width="600px"
        open={visible}
        onClose={closeHandler}
      >
        <Modal.Header css={{ justifyContent: "start" }}>
          <Text id="modal-title" h4>
            Add
          </Text>
        </Modal.Header>
        <Divider css={{ my: "$5" }} />
        <Modal.Body css={{ py: "$10" }}>
          <Flex
            direction={"column"}
            css={{
              flexWrap: "wrap",
              gap: "$8",
              "@lg": { flexWrap: "nowrap", gap: "$12" },
            }}
          >
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Dropdown>
                {/* <DropdownTrigger>
                  <Button variant="bordered" className="capitalize">
                    {selectedValue}
                  </Button>
                </DropdownTrigger> */}
                <DropdownMenu
                  aria-label="Single selection example"
                  variant="flat"
                  disallowEmptySelection
                  selectionMode="single"
                  selectedKeys={selectedKeys}
                  onSelectionChange={setSelectedKeys}
                >
                  <DropdownItem key="text">Text</DropdownItem>
                  <DropdownItem key="number">Number</DropdownItem>
                  <DropdownItem key="date">Date</DropdownItem>
                  <DropdownItem key="single_date">Single Date</DropdownItem>
                  <DropdownItem key="iteration">Iteration</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Input
                label="Customer Name"
                bordered
                clearable
                fullWidth
                size="lg"
                placeholder="Customer Name"
                name="customerName"
                value={bikeData.customerName}
                onChange={handleChange}
              />
              <Input
                label="Customer Number"
                name="customerNumber"
                clearable
                bordered
                fullWidth
                size="lg"
                placeholder="Customer Number"
                value={bikeData.customerNumber}
                onChange={handleChange}
              />
            </Flex>

            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Price"
                clearable
                bordered
                fullWidth
                size="lg"
                type="number"
                name="price"
                placeholder="Price"
                value={bikeData.price}
                onChange={handleChange}
              />
              <Input
                label="Bike Name"
                clearable
                bordered
                fullWidth
                size="lg"
                type="text"
                name="title"
                placeholder="Bike Name"
                value={bikeData.title}
                onChange={handleChange}
              />
            </Flex>
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Color"
                clearable
                bordered
                fullWidth
                size="lg"
                type="text"
                name="color"
                placeholder="Color"
                value={bikeData.color}
                onChange={handleChange}
              />
              <Input
                label="Bike Year"
                clearable
                bordered
                fullWidth
                size="lg"
                type="number"
                name="year"
                placeholder="Year"
                value={bikeData.year}
                onChange={handleChange}
              />
            </Flex>
            <Flex
              css={{
                gap: "$10",
                flexWrap: "wrap",
                "@lg": { flexWrap: "nowrap" },
              }}
            >
              <Input
                label="Condition"
                clearable
                bordered
                fullWidth
                size="lg"
                type="text"
                name="condition"
                placeholder="Condition"
                value={bikeData.condition}
                onChange={handleChange}
              />
              <Input
                label="Upload Image"
                clearable
                bordered
                fullWidth
                size="lg"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Flex>
          </Flex>
        </Modal.Body>
        <Divider css={{ my: "$5" }} />
        <Modal.Footer>
          <Button auto onClick={handleSubmit}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
