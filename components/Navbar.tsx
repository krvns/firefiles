import { Box, Button, Flex, Tooltip, useColorMode, useColorModeValue } from "@chakra-ui/react";
import { faDonate, faEdit, faMoon, faSignOutAlt, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useApp from "@hooks/useApp";
import useUser from "@hooks/useUser";
import { useRouter } from "next/router";
import React from "react";

export default function Navbar() {
	const { colorMode, toggleColorMode } = useColorMode();
	const { logout } = useUser();
	const { onLogout } = useApp();
	const router = useRouter();

	return (
		<Flex align="center" justify="end" px="2" mt="2" borderBottomWidth="1px" boxShadow="sm">
			<Box mb="2">
				<TooltipButton
					icon={<FontAwesomeIcon icon={faEdit} />}
					label="Edit Firebase config"
					onClick={() => router.push("/config")}
				/>
				<TooltipButton
					icon={<FontAwesomeIcon icon={colorMode === "light" ? faMoon : faSun} />}
					label="Toggle dark mode"
					onClick={toggleColorMode}
				/>
				<TooltipButton
					icon={<FontAwesomeIcon icon={faDonate} />}
					label="Sponsor this project"
					onClick={() => {
						const url = "https://github.com/faisalsayed10/firefiles#sponsor-this-project";
						window.open(url, "_blank");
					}}
				/>
				<TooltipButton
					icon={<FontAwesomeIcon icon={faSignOutAlt} />}
					label="Log out"
					onClick={() => {
						logout();
						onLogout();
					}}
				/>
			</Box>
		</Flex>
	);
}

const TooltipButton = ({ label, onClick, icon }) => (
	<Tooltip label={label} hasArrow>
		<Button
			w="50px"
			h="50px"
			variant="solid"
			borderRadius="0"
			_focus={{ outline: "none" }}
			ml="2"
			onClick={onClick}
		>
			{icon}
		</Button>
	</Tooltip>
);
