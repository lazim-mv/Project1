import { Button, Input, Text, Spinner } from "@nextui-org/react";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Breadcrumbs, Crumb, CrumbLink } from "../breadcrumb/breadcrumb.styled";
import { DotsIcon } from "../icons/accounts/dots-icon";
import { ExportIcon } from "../icons/accounts/export-icon";
import { InfoIcon } from "../icons/accounts/info-icon";
import { TrashIcon } from "../icons/accounts/trash-icon";
import { HouseIcon } from "../icons/breadcrumb/house-icon";
import { UsersIcon } from "../icons/breadcrumb/users-icon";
import { SettingsIcon } from "../icons/sidebar/settings-icon";
import { Flex } from "../styles/flex";
import { TableWrapper } from "../table/table";
import { Add } from "./add-user";
import axios from "axios";
import Lottie from "lottie-react";
import animationData from "../../public/loadingAnimation.json";
import { fetchDataFromAPI } from "../table/data";

export const Accounts = () => {
  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      await fetchDataFromAPI();
      setIsDataLoaded(true);
    } catch (error) {
      console.error("Error fetching data:", error);
      setIsDataLoaded(false);
    }
  };

  console.log("hello");
  return (
    <>
      {!isDataLoaded ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Lottie
            animationData={animationData}
            style={{ width: "150px", height: "150px" }}
          />
        </div>
      ) : (
        <Flex
          css={{
            mt: "$5",
            px: "$6",
            "@sm": {
              mt: "$10",
              px: "$16",
            },
          }}
          justify={"center"}
          direction={"column"}
        >
          <Breadcrumbs>
            <Crumb>
              <HouseIcon />
              <Link href={"/"}>
                <CrumbLink href="#">Home</CrumbLink>
              </Link>
              <Text>/</Text>
            </Crumb>

            <Crumb>
              <UsersIcon />
              <CrumbLink href="#">Users</CrumbLink>
              <Text>/</Text>
            </Crumb>
            <Crumb>
              <CrumbLink href="#">List</CrumbLink>
            </Crumb>
          </Breadcrumbs>

          <Text h3>All Accounts</Text>
          <Flex
            css={{ gap: "$8" }}
            align={"center"}
            justify={"between"}
            wrap={"wrap"}
          >
            <Flex
              css={{
                gap: "$6",
                flexWrap: "wrap",
                "@sm": { flexWrap: "nowrap" },
              }}
              align={"center"}
            >
              <Input
                css={{ width: "100%", maxW: "410px" }}
                placeholder="Search users"
              />
              {/* <SettingsIcon />
          <TrashIcon />
          <InfoIcon />
          <DotsIcon /> */}
            </Flex>
            <Flex direction={"row"} css={{ gap: "$6" }} wrap={"wrap"}>
              <Add />
              <Button auto iconRight={<ExportIcon />}>
                Export to CSV
              </Button>
            </Flex>
          </Flex>

          <TableWrapper />
        </Flex>
      )}
    </>
  );
};
