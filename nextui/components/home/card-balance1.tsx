import { Card, Text } from "@nextui-org/react";
import React from "react";
import { Community } from "../icons/community";
import { Box } from "../styles/box";
import { Flex } from "../styles/flex";
import axios from "axios";

export const CardBalance1 = () => {
  const [data, setData] = React.useState([]);
  const [totalBikes, setTotalBikes] = React.useState();
  const [totalSpend, setTotalSpend] = React.useState();

  React.useEffect(() => {
    if (data.length === 0) {
      fetchData();
    } else {
      setTotalBikes(data.length);
      setTotalSpend(data.reduce((total, bike) => total + bike.price, 0));
    }
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://project1-l1jd.onrender.com/products/admin/api/bikes/"
      );
      console.log("response fetching data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
      return null;
    }
  };

  console.log(data, "responseData");

  return (
    <Card
      css={{
        mw: "375px",
        bg: "$blue600",
        borderRadius: "$xl",
        px: "$6",
      }}
    >
      <Card.Body css={{ py: "$10" }}>
        <Flex css={{ gap: "$5" }}>
          <Community />
          <Flex direction={"column"}>
            <Text span css={{ color: "white", whiteSpace: "nowrap" }}>
              Total Bussiness
            </Text>
            <Text span css={{ color: "white" }} size={"$xs"}>
              {totalBikes !== undefined && totalBikes}
            </Text>
          </Flex>
        </Flex>
        <Flex css={{ gap: "$6", py: "$4" }} align={"center"}>
          <Text span size={"$xl"} css={{ color: "white" }} weight={"semibold"}>
            ${totalSpend !== undefined && totalSpend}
          </Text>
          <Text span css={{ color: "$green600" }} size={"$xs"}>
            + 4.5%
          </Text>
        </Flex>
        {/* <Flex css={{ gap: "$12" }} align={"center"}>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$green600" }}
              weight={"semibold"}
            >
              {"↓"}
            </Text>
            <Text span size={"$xs"} css={{ color: "$white" }}>
              100,930 USD
            </Text>
          </Box>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$red600" }}
              weight={"semibold"}
            >
              {"↑"}
            </Text>
            <Text span size={"$xs"} css={{ color: "$white" }}>
              54,120 USD
            </Text>
          </Box>
          <Box>
            <Text
              span
              size={"$xs"}
              css={{ color: "$green600" }}
              weight={"semibold"}
            >
              {"⭐"}
            </Text>
            <Text span size={"$xs"} css={{ color: "$white" }}>
              125 VIP
            </Text>
          </Box>
        </Flex> */}
      </Card.Body>
    </Card>
  );
};
