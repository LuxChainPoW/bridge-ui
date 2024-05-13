import { createTheme } from "@chainsafe/common-theme";

export const lightTheme = createTheme({
  globalStyling: {
    body: {
      background: "linear-gradient(315deg, #fff 0%, #d7eaec 74%)",
	  backgroundSize: "cover",
	  color: "#000",
	  fontWeight: "600",
	  fontFamily: "'Trebuchet MS', sans-serif"
    },
  },
  themeConfig: {
    constants: {
      navItemHeight: 42,
    },
    palette: {
      additional: {
        general: {
          1: "#85A5FF", // Accents //geekblue4
        },
        transferUi: {
          1: "#595959", // FAQ button // gray8
        },
        header: {
          1: "#F5F5F5", // Background
          2: "#595959", // Text color //gray8
          3: "#BFBFBF", // border // gray6
        },
        preflight: {
          1: "#85A5FF", // Button bg color
          2: "#fff", // Button color
        },
        transactionModal: {
          1: "#597EF7", // border //geekblue5
          2: "#85A5FF", // indicator border //geekblue4
          3: "#2F54EB", // indicator text //geekblue6
        },
      },
    },
    overrides: {
      CheckboxInput: {
        root: {
          alignItems: "center",
        },
      },
      Button: {
        variants: {
          primary: {
            root: {
              backgroundColor: "#03225D",
              color: "#ffffff",
              border: `1px solid #03225D`,
              "& svg": {
                fill: "#ffffff",
              },
            },
            active: {
              backgroundColor: "#ffffff",
              color: "#03225D",
              "& svg": {
                fill: "#03225D",
              },
            },
            hover: {
              backgroundColor: "#ffffff",
              color: "#03225D",
              "& svg": {
                fill: "#03225D",
              },
            },
            focus: {
              backgroundColor: "#ffffff",
              color: "#03225D",
              "& svg": {
                fill: "#03225D",
              },
            },
          },
          outline: {
            root: {
              backgroundColor: "transparent",
              color: "#ffffff",
              border: `1px solid #ffffff`,
              "& svg": {
                fill: "#ffffff",
              },
            },
            active: {
              backgroundColor: "#ffffff",
              color: "#03225D",
              borderColor: "#ffffff",
              "& svg": {
                fill: "#03225D",
              },
            },
            hover: {
              backgroundColor: "#ffffff",
              color: "#03225D",
              borderColor: "#ffffff",
              "& svg": {
                fill: "#03225D",
              },
            },
            focus: {
              backgroundColor: "#ffffff",
              color: "#03225D",
              borderColor: "#ffffff",
              "& svg": {
                fill: "#03225D",
              },
            },
          },
        },
      },
    },
  },
});
