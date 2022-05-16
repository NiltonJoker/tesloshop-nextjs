import NextLink from "next/link";
import { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UiContext } from "../../context";

import {
  AppBar,
  Badge,
  Box,
  Button,
  IconButton,
  Input,
  InputAdornment,
  Link,
  Toolbar,
  Typography,
} from "@mui/material";

import SearchOutlined from "@mui/icons-material/SearchOutlined";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import ClearOutlined from "@mui/icons-material/ClearOutlined";

export const Navbar = () => {
  const { asPath, push } = useRouter();

  const { toggleSideMenu } = useContext(UiContext);

  const [searchTerm, setSearchTerm] = useState("");
  const [isSearchVisible, setIsSearchVisible] = useState(false)

  const onSearchTerm = () => {
    if (searchTerm.trim().length === 0) return;

    push(`/search/${searchTerm}`);
    setSearchTerm("")
    setIsSearchVisible(false)
  };

  return (
    <AppBar>
      <Toolbar>
        <NextLink href={"/"} passHref>
          <Link display={"flex"} alignItems="center">
            <Typography variant="h6">Teslo</Typography>
            <Typography sx={{ ml: 0.5 }}>Shop</Typography>
          </Link>
        </NextLink>

        <Box flex={1} />

        {/* Conditional style by material breakpoitns */}
        <Box sx={{ display: isSearchVisible ? "none" : { xs: "none", sm: "flex" } }} gap={1} className="fadeIn">
          <NextLink href={"/category/men"} passHref>
            <Link>
              <Button color={asPath === "/category/men" ? "primary" : "info"}>
                Hombres
              </Button>
            </Link>
          </NextLink>
          <NextLink href={"/category/women"} passHref>
            <Link>
              <Button color={asPath === "/category/women" ? "primary" : "info"}>
                Mujeres
              </Button>
            </Link>
          </NextLink>
          <NextLink href={"/category/kid"} passHref>
            <Link>
              <Button color={asPath === "/category/kid" ? "primary" : "info"}>
                Niños
              </Button>
            </Link>
          </NextLink>
        </Box>

        <Box flex={1} />

        

        {/* Pantallaas grandes */}
        {
          isSearchVisible
          ? (
            <Input
              sx={{ display: { xs: "none", sm: "flex" } }}
              type="text"
              value={searchTerm}
              className="fadeIn"
              onChange={(e) => setSearchTerm(e.target.value)}
              autoFocus
              onBlur={() => setIsSearchVisible(false)}
              onKeyPress={(e) => (e.key === "Enter" ? onSearchTerm() : null)}
              placeholder="Buscar..."
              endAdornment={
                <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setIsSearchVisible(false)}
                      >
                      <ClearOutlined />
                    </IconButton>
                  </InputAdornment>
                }
            />
          )
          : (
            <IconButton sx={{ display: { xs: "none", sm: "flex" } }} onClick={() => setIsSearchVisible(true)} className="fadeIn" >
              <SearchOutlined />
            </IconButton>
          )
        }


        {/* Pantallas pequeñas */}
        <IconButton
          sx={{ display: { xs: "flex", sm: "none" } }}
          onClick={toggleSideMenu}
        >
          <SearchOutlined />
        </IconButton>

        <NextLink href={"/cart"}>
          <Link>
            <IconButton>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCartOutlined />
              </Badge>
            </IconButton>
          </Link>
        </NextLink>

        <Button onClick={toggleSideMenu}>Menu</Button>
      </Toolbar>
    </AppBar>
  );
};
