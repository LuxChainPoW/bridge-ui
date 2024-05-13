import {
  NavLink,
  Typography,
  useHistory,
  useLocation,
} from "@chainsafe/common-components";
import { createStyles, ITheme, makeStyles } from "@chainsafe/common-theme";
import React, { useEffect, useState } from "react";
import { ReactNode } from "react";
import AppHeader from "./AppHeader";
import { ReactComponent as GlobalSvg } from "../media/Icons/global.svg";
import { ReactComponent as GiftSvg } from "../media/Icons/gift.svg";
import { ROUTE_LINKS } from "../Components/Routes";

interface IAppWrapper {
  children: ReactNode | ReactNode[];
  wrapTokenPage?: boolean;
}

const useStyles = makeStyles(
  ({ animation, constants, palette, breakpoints }: ITheme) => {
    return createStyles({
      root: {
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: 30,
        marginTop: 10,
        [breakpoints.between("sm", "xl")]: {
          paddingTop: 20,
          marginTop: 55,
        },
      },
      inner: {
        paddingTop: (constants.navItemHeight as number) * 2,
        paddingBottom: (constants.navItemHeight as number) * 2,
      },
      cta: {
        display: "block",
        maxWidth: 200,
        maxHeight: 200,
        position: "fixed",
        bottom: constants.generalUnit * 3,
        right: constants.generalUnit * 3,
      },
      content: {
        // position: "absolute",
        // top: "50%",
        // left: "50%",
        // transform: "translate(-50%, -50%)",
        margin: `-50px 25% 50px 25%`,
        minWidth: 460,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        borderRadius: 4,
      },
      explorerMainContent: {
        width: "100%",
        height: "100%",
        margin: "0 auto",
      },
      pageArea: {
        height: "100%",
        width: "100%",
        overflow: "hidden",
        border: "2px solid #03225D",
        borderRadius: "5px",
		marginTop: "50px",
      },
      explorerArea: {
        width: "100%",
        height: "100vh",
        marginTop: 86,
      },
      navTabs: {
        // position: "absolute",
        // top: 0,
        // left: 0,
        width: "100%",
        // transform: "translate(0,-100%)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: `0 ${constants.generalUnit}px`,
        transform: "translateY(1px)",
        "& > a": {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          padding: "15px 15px",
          border: "2px solid #000",
		  borderRadius: "5px",
          textDecoration: "none",
          marginRight: constants.generalUnit,
          transitionDuration: `${animation.transform}ms`,
          color: "#000",
          maxHeight: constants.navItemHeight,
          "& svg": {
            transitionDuration: `${animation.transform}ms`,
            fill: "red",
          },
          "&.active": {
			background: "#03225D",
			padding: "15px 15px",
			borderRadius: "5px",
			fontSize: "22px",
			fontWeight: "bold",
            color: "#fff",
            textDecoration: "underline",
            "& svg": {
              fill: palette.additional["geekblue"][5],
            },
          },
          "& > *:first-child": {
            marginRight: constants.generalUnit,
          },
        },
        "& svg": {
          height: 14,
          width: 14,
        },
      },
    });
  }
);

const AppWrapper: React.FC<IAppWrapper> = ({
  children,
  wrapTokenPage,
}: IAppWrapper) => {
  const classes = useStyles();
  const [enableNavTabs, setEnableNavTabs] = useState(true);

  const location = useLocation();
  const { redirect } = useHistory();

  const { __RUNTIME_CONFIG__ } = window;

  const indexerEnabled = "INDEXER_URL" in __RUNTIME_CONFIG__;

  useEffect(() => {
    if (location.pathname.includes("/explorer/list") && !indexerEnabled) {
      redirect("/transfer");
    }
  }, []);

  useEffect(() => {
    if (location.pathname.includes("/explorer/list")) {
      return setEnableNavTabs(false);
    }
    return setEnableNavTabs(true);
  }, [location]);

  return (
    <section className={classes.root}>
      {enableNavTabs ? (
        <section className={classes.inner}>
          <AppHeader />
          <section className={classes.content}>
          <div className={classes.pageArea}>{children}</div>
        </section>

          {/* Put CTA here */}
          {/* <a className={classes.cta} rel="noopener noreferrer" target="_blank" href="#">
        </a> */}
        </section>
      ) : (
        <section className={classes.explorerMainContent}>
          <AppHeader />
          <div className={classes.explorerArea}>{children}</div>
        </section>
      )}
    </section>
  );
};

export default AppWrapper;
