// pages/index.tsx
import type {
  GetStaticProps,
  InferGetStaticPropsType,
  GetServerSideProps,
} from "next";
import Link from "next/link";
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useStore } from "../context/StoreContext";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import Image from "next/image";
import catPic from "../../public/static/cat.png";
import {
  ListNecoCompaniesResponse,
  ListNecoCompaniesVariables,
  NecoCompany,
} from "@/types/graphql.types";
import React from "react";

interface Props {
  listNecoCompanies: ListNecoCompaniesResponse; // Ensure this is the correct name
  _nextI18Next?: {
    initialI18nStore: any;
    initialLocale: string;
  };
}
const Homepage = (_props: Props) => {
  console.log(_props);
  const router = useRouter();
  const { t, i18n } = useTranslation("common"); // Use the 'common' namespace
  const changeTo = router.locale === "en" ? "jp" : "en";

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentListId, setCurrentListId] = React.useState(null);

  const handleClick = (event, id: string) => {
    setAnchorEl(event.currentTarget);
    setCurrentListId(id);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setCurrentListId(null);
  };
  return (
    <>
      <h1>neco-home</h1>

      <Image
        priority={true}
        src={catPic}
        width={0}
        height={0}
        alt="topimage"
        style={{ width: "10%", height: "auto" }} // optional
      />

      <Container style={{ backgroundColor: "#f5f5f5", padding: "16px" }}>
        <Grid container spacing={3}>
          {_props.listNecoCompanies.items.map((item) => (
            <Grid item xs={12} sm={4} key={item.id}>
              <Card
                onClick={(event) => handleClick(event, item.id)}
                style={{ cursor: "pointer", maxWidth: "100%" }}
              >
                <CardMedia
                  component="img"
                  height="100"
                  image={item.compImageUrl}
                  alt={item.compName}
                  style={{ maxHeight: "100px" }}
                />
                <CardContent>
                  <Typography variant="h6">{item.compName}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {item.description}
                  </Typography>
                </CardContent>
              </Card>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl) && currentListId === item.id}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Option 1</MenuItem>
                <MenuItem onClick={handleClose}>Option 2</MenuItem>
                {/* Add more MenuItems if needed */}
              </Menu>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

// Async function to return a Promise of ListNecoCompaniesResponse[]
export async function getLists(): Promise<ListNecoCompaniesResponse> {
  // Simulate asynchronous data fetching
  return new Promise<ListNecoCompaniesResponse>((resolve) => {
    setTimeout(() => {
      const responses = {
        items: [
          {
            compName: "Dummyカレー",
            description: "カレーといえばDummyカレー",
            id: "c018",
            compLogoUrl: "https://craft.digick.jp/neco/logo-b.png",
            compImageUrl: "https://craft.digick.jp/neco/logo-orange.png",
          },
          {
            compName: "ChaCha",
            description:
              "お茶の香り、旨味、甘みをゆっくり堪能できる御茶処として茶々工房",
            id: "c12",
            compLogoUrl: "https://craft.digick.jp/neco/img/chacha/logo.png",
            compImageUrl: "https://craft.digick.jp/neco/img/chacha/logo.png",
          },
          {
            compName: "ミスシャレード",
            description: "東京国分寺・埼玉所沢・埼玉和光・埼玉越谷メンズエステ",
            id: "c6",
            compLogoUrl: "https://craft.digick.jp/neco/img/mens/logo-bg.png",
            compImageUrl: "https://www.miss-charade.com/asset/img/logo.jpg",
          },
          {
            compName: "Place",
            description:
              "JR山手線高田馬場駅より神田川方面の路地裏にBAR『PLACE』 楽しいマスターと自然と仲良くなる客層をバーカウンターで。",
            id: "c8",
            compLogoUrl:
              "https://barplace.jp/wp/wp-content/uploads/2022/01/logo001-1.png",
            compImageUrl:
              "https://barplace.jp/wp/wp-content/uploads/2022/01/top005-2048x683.jpg",
          },
        ],
      };
      resolve(responses);
    }, 100); // Simulating a delay
  });
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const locale = context.locale ?? "en";

  // Fetch your data
  const listNecoCompanies = await getLists();
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      listNecoCompanies, // Make sure this matches the interface
    },
  };
};

export default Homepage;
