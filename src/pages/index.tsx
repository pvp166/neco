// pages/index.tsx
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from 'next/link'
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useStore } from "../context/StoreContext";
import { useRouter } from 'next/router'
import Container from '@mui/material/Container';
const Homepage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { t, i18n } = useTranslation("common"); // Use the 'common' namespace
  const changeTo = router.locale === 'en' ? 'jp' : 'en'
  return (
    <>
      <Container maxWidth="sm"></Container>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
export default Homepage;
