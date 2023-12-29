import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/react";
import {
  MdHome,
  MdMenuBook,
  MdMenu,
  MdArrowDropDown,
  MdFavorite,
  MdNoteAdd,
  MdDownload,
} from "react-icons/md";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { IconType } from "react-icons";
import { ReactNode } from "react";
import { PanelaLogo } from "./logo";
import { NavLink as RouterLink } from "react-router-dom";
import { ColorModeSwitcher } from "./colour-switcher";
import { useAuth0 } from "@auth0/auth0-react";
import { useAppSelector } from "../hooks/reduxHooks";

interface LinkItemProps {
  name: string;
  icon: IconType;
  href: string;
}

const LinkItems: Array<LinkItemProps> = [
  // { name: "Home", icon: MdHome, href: "/dashboard/" },
  { name: "Recipes", icon: MdMenuBook, href: "/dashboard/allrecipes" },
  { name: "Add Recipe", icon: MdNoteAdd, href: "/dashboard/add-recipe" },
  { name: "Import Recipe", icon: MdDownload, href: "/dashboard/import-recipe" },
  {
    name: "Ingredients",
    icon: CgSmartHomeRefrigerator,
    href: "/dashboard/ingredients",
  },
  // { name: "Favorites", icon: MdFavorite, href: "/dashboard/favorites" },
  // { name: "Settings", icon: MdSettings , href: "/settings" }, //TODO: Finish this component
];

interface NavItemProps extends FlexProps {
  icon: IconType;
  href: string;
  children: ReactNode;
}
const NavItem = ({ icon, href, children, ...rest }: NavItemProps) => {
  return (
    <Link
      as={RouterLink}
      to={href}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
      sx={{
        "&.active": {
          backgroundColor: "green.200",
          color: "green.500",
        },
      }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "green.200",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            mr="4"
            fontSize="24"
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

interface SidebarProps extends BoxProps {
  onClose: () => void;
}

const SidebarContent = ({ onClose, ...rest }: SidebarProps) => {
  return (
    <Box
      bg={useColorModeValue("white", "gray.900")}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <PanelaLogo />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem
          key={link.name}
          icon={link.icon}
          href={link.href}
          onClick={onClose}
        >
          {link.name}
        </NavItem>
      ))}
    </Box>
  );
};

interface MobileProps extends FlexProps {
  onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
  const { user, logout } = useAuth0();
  const userInfo = useAppSelector((state) => state.users.userInfo);

  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      {/* <DevButton /> */}
      <IconButton
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<MdMenu />}
      />
      <Box display={{ base: "flex", md: "none" }}>
        <PanelaLogo />
      </Box>

      <HStack spacing={{ base: "0", md: "6" }}>
        <ColorModeSwitcher />
        <Flex alignItems={"center"}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: "none" }}
            >
              <HStack>
                <Avatar size={"sm"} src={user?.picture} />
                <VStack
                  display={{ base: "none", md: "flex" }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2"
                >
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    {userInfo?.role}
                  </Text>
                </VStack>
                <Box display={{ base: "none", md: "flex" }}>
                  <MdArrowDropDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
            //   bg={useColorModeValue("white", "gray.900")}
            //   borderColor={useColorModeValue("gray.200", "gray.700")}
            >
              {/* <MagicButton/> */}
              <MenuItem onClick={() => console.log(JSON.stringify(user))}>
                Profile
              </MenuItem>
              {/* <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem onClick={() => logout()}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};

export function SidebarWithHeader({ children }: { children: ReactNode }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box minH="100vh" bg={useColorModeValue("gray.100", "gray.900")}>
      <SidebarContent
        onClose={() => onClose}
        display={{ base: "none", md: "block" }}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full"
      >
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}
