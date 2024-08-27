// pages/index.tsx
import type { GetStaticProps, InferGetStaticPropsType } from "next";
import Link from 'next/link'
import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useStore } from "../context/StoreContext";
import { useRouter } from 'next/router'

const Homepage = (_props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const router = useRouter()
  const { t, i18n } = useTranslation("common"); // Use the 'common' namespace
  const changeTo = router.locale === 'en' ? 'jp' : 'en'
  return (
    <>
      <Link href="/" locale={changeTo}>
        <button>{t("change-locale", { changeTo })}</button>
      </Link>
      <Link href="/second-page" locale={changeTo}>
        <button>{t("change-locale", { changeTo })}</button>
      </Link>
      <h1>{t("language")}</h1>
      <p>{t("title")}</p>
    </>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
});
export default Homepage;
