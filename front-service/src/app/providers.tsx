// "use client";

// import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
// import { ThemeProvider } from "next-themes";

// export function Providers({ children }: { children: React.ReactNode }) {
//   return (
//     <ThemeProvider defaultTheme="light" attribute="class">
//       <SidebarProvider>{children}</SidebarProvider>
//     </ThemeProvider>
//   );
// }

"use client";

import React, { useEffect, useState } from "react";
import { SidebarProvider } from "@/components/Layouts/sidebar/sidebar-context";
import { ThemeProvider as NextThemesProvider, useTheme as useNextTheme } from "next-themes";
import { ThemeProvider as MUIThemeProvider, createTheme } from "@mui/material/styles";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider defaultTheme="light" attribute="class">
      <SidebarProvider>
        <MuiThemeWrapper>{children}</MuiThemeWrapper>
      </SidebarProvider>
    </NextThemesProvider>
  );
}

// Wrapper pour synchroniser next-themes et MUI
function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { theme: nextTheme } = useNextTheme();
  const [muiTheme, setMuiTheme] = useState(createTheme({ palette: { mode: "light" } }));

  useEffect(() => {
    setMuiTheme(
      createTheme({
        palette: {
          mode: nextTheme === "dark" ? "dark" : "light",
          primary: { main: "#5750F1" },
          background: {
            default: nextTheme === "dark" ? "#020d1a" : "#fff",
            paper: nextTheme === "dark" ? "#121212" : "#fff",
          },
          text: {
            primary: nextTheme === "dark" ? "#fff" : "#000",
          },
        },
        typography: {
          fontFamily: "Satoshi, sans-serif",
        },
      })
    );
  }, [nextTheme]);

  return <MUIThemeProvider theme={muiTheme}>{children}</MUIThemeProvider>;
}
