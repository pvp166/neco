import React, {
    createContext,
    useState,
    ReactNode,
    useContext,
    useCallback,
    useEffect,
  } from "react";
  import Cookies from "js-cookie";
  
  interface StoreState {
    locales: string[];
    locale: string;
    sessionId: string | null;
    userName: string;
    lineUser: any;
    awsUser: any;
    selected: any;
    company: any;
    payment: any;
    axiosError: any;
    prevLINEcomp: boolean;
  }
  
  interface StoreActions {
    clearAll: () => void;
    prevLINEcomp: (prevLINEcomp: boolean) => void;
    clearPayment: () => void;
    setLocale: (locale: string) => void;
    setSessionId: (sessionId: string) => void;
    clearLineUser: () => void;
    setUserName: (userName: string) => void;
    setLineUser: (lineUser: any) => void;
    setAwsUser: (awsUser: any) => void;
    setAwsUserStripeUser: (stripeUser: any) => void;
    setSelected: (selected: any) => void;
    setSelectedDat: (selectedDat: any) => void;
    setCompany: (company: any) => void;
    setAvailShops: (availShops: any) => void;
    setPayment: (payment: any) => void;
    setAxiosError: (axiosError: any) => void;
  }
  
  const StoreContext = createContext<
    { state: StoreState; actions: StoreActions } | undefined
  >(undefined);
  
  const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<StoreState>({
      locales: ["ja", "en"],
      locale: "ja",
      sessionId: null,
      userName: "Guest",
      lineUser: {},
      awsUser: {},
      selected: {},
      company: null,
      payment: {},
      axiosError: null,
      prevLINEcomp: false,
    });
  
    useEffect(() => {
      const savedLocale = Cookies.get('locale');
      if (savedLocale && state.locales.includes(savedLocale)) {
        setState(prevState => ({ ...prevState, locale: savedLocale }));
      }
    }, []);
  
    const setLocale = useCallback((locale: string) => {
      if (state.locales.includes(locale)) {
        setState(prevState => ({ ...prevState, locale }));
        Cookies.set('locale', locale, { expires: 30, path: '/' });
      }
    }, [state.locales]);
  
    const setSessionId = (sessionId: string) =>
      setState((prevState) => ({ ...prevState, sessionId }));
  
    const clearLineUser = () =>
      setState((prevState) => ({ ...prevState, lineUser: {} }));
  
    const setUserName = (userName: string) =>
      setState((prevState) => ({ ...prevState, userName }));
  
    const setLineUser = (lineUser: any) =>
      setState((prevState) => ({ ...prevState, lineUser }));
  
    const setAwsUser = (awsUser: any) =>
      setState((prevState) => ({ ...prevState, awsUser }));
  
    const setAwsUserStripeUser = (stripeUser: any) =>
      setState((prevState) => {
        const awsUser = {
          ...prevState.awsUser,
          attributes: {
            ...prevState.awsUser.attributes,
            "custom:stripeUser": stripeUser,
          },
        };
        return { ...prevState, awsUser };
      });
  
    const setSelected = (selected: any) =>
      setState((prevState) => ({ ...prevState, selected }));
  
    const setSelectedDat = (selectedDat: any) =>
      setState((prevState) => ({
        ...prevState,
        selected: { ...prevState.selected, dat: selectedDat },
      }));
  
    const setCompany = (company: any) =>
      setState((prevState) => ({ ...prevState, company }));
  
    const setAvailShops = (availShops: any) =>
      setState((prevState) => ({
        ...prevState,
        company: { ...prevState.company, shop: availShops },
      }));
  
    const setPayment = (payment: any) =>
      setState((prevState) => ({ ...prevState, payment }));
  
    const setAxiosError = (axiosError: any) =>
      setState((prevState) => ({ ...prevState, axiosError }));
  
    const clearAll = useCallback(() => {
      setState((prevState) => ({
        ...prevState,
        sessionId: null,
        lineUser: {},
        selected: {},
        company: null,
        payment: {},
        axiosError: null,
      }));
    }, []);
  
    const actions = {
      clearAll,
      prevLINEcomp: (prevLINEcomp: boolean) =>
        setState((prevState) => ({ ...prevState, prevLINEcomp })),
      clearPayment: () =>
        setState((prevState) => ({ ...prevState, payment: {} })),
      setLocale,
      setSessionId,
      clearLineUser,
      setUserName,
      setLineUser,
      setAwsUser,
      setAwsUserStripeUser,
      setSelected,
      setSelectedDat,
      setCompany,
      setAvailShops,
      setPayment,
      setAxiosError,
    };
  
    return (
      <StoreContext.Provider value={{ state, actions }}>
        {children}
      </StoreContext.Provider>
    );
  };
  
  const useStore = () => {
    const context = useContext(StoreContext);
    if (context === undefined) {
      throw new Error("useStore must be used within a StoreProvider");
    }
    return context;
  };
  
  export { StoreProvider, useStore };
  