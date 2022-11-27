import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import { Box, IconButton, InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery

} from "@mui/material";
import {
    Search,
    Message,
    DarkMode,
    
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material"
import { setMode, setLogout } from "./../../state"

const NavBar = () => {
    const [ isMobileMenuToggled, setIsMobileMenuToggled ] = useState(false); // For small screen. Toggle it
    const dispatch = useDispatch(); // dispatch actions from reducer;
    const navigate = useNavigate();
    const user = useSelector(state => state.user);
    // Hook in the material ui to determine device width
    const isNonMobileScreens = useMediaQuery("(min-width:1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    // const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    const fullName = `${user.firstName} ${user.lastName}`;

    return <FlexBetween padding="1 rem 6%" backgroundColor={alt}>
        <FlexBetween gap="1.75rem">
            <Typography fontWeight="bold" fontSize="clamp(1rem, 2rem, 2.25rem)"
            color="primary"
            onClick={() => navigate("/home")}
            sx={{
                "&:hover": {
                    color: primaryLight,
                    cursor: "pointer",
                }
            }}
            > 
                The Social
            </Typography>
            {isNonMobileScreens && (
                <FlexBetween backgroundColor={neutralLight} borderRadius="9px" gap="3rem" padding="0.1rem">
                    <InputBase placeholder="...Search"/>
                    <IconButton>
                        <Search/>
                    </IconButton>
                </FlexBetween>
            )}
        </FlexBetween>
            {/* DESKTOP NAV */}
            { isNonMobileScreens ? (
                <FlexBetween gap="2rem">
                    <IconButton onClick={() => dispatch(setMode())}>
                        {theme.palette.mode === "dark" ? (
                            <DarkMode sx={{fontSize: "25px"}}/>
                        ) : (
                            <DarkMode></DarkMode>
                            // <LigtMode sx={{color: dark, fontSize: "25px"}}/>
                        )}
                    </IconButton>
                    <Message sx={{fontSize: "25px"}}/>
                    <Notifications sx={{ fontSize: "25px"}}/>
                    <Help sx={{ fontSize: "25px"}}/>
                    <FormControl variant="standard" value ={fullName}>
                        <Select
                            value={fullName}
                            sx= {{
                                backgroundColor: neutralLight,
                                width: "150px",
                                borderRadius: "0.25rem",
                                p: "0.25rem 1 rem",
                                "& .MuiSvgIcon-root": {
                                    pr: "0.25rem",
                                    width: "3 rem"
                                },
                                "& .MuiSelect=select:focus": {
                                    backgroundColor: neutralLight
                                }
                            }}
                            input={<InputBase/>}
                        >
                            <MenuItem value={fullName}>
                                <Typography>{fullName}</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>
                        </Select>
                    </FormControl>
                </FlexBetween>): (
                    <IconButton
                        onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
                    >
                        <Menu/>
                    </IconButton>
                )}
                {/* MOBILE NAV */}
                {!isNonMobileScreens && isMobileMenuToggled && (
                    <Box
                        position="fixed"
                        right="0"
                        bottom="0"
                        height="100%"
                        zIndex="0"
                        maxWidth="500px"
                        minWidth="300px"
                        backgroundColor={background}
                    >
                        {/* CLOSE ICON */}
                        <Box display="flex" justifyContent="flex-end" p="1rem">
                            <IconButton onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}>
                                <Close/>
                            </IconButton>
                        </Box>

                        {/* MENU ITEMS */}
                        <FlexBetween 
                            display="flex" 
                                flexDirection="column" 
                                justifyContent="center" 
                                alignItems="center" 
                                gap="3rem"
                            >
                            <IconButton onClick={() => dispatch(setMode())}>
                                {theme.palette.mode === "dark" ? (
                                    <DarkMode sx={{fontSize: "25px"}}/>
                                ) : (
                                    <DarkMode></DarkMode>
                                    // <LigtMode sx={{color: dark, fontSize: "25px"}}/>
                                )}
                            </IconButton>
                            <Message sx={{fontSize: "25px"}}/>
                            <Notifications sx={{ fontSize: "25px"}}/>
                            <Help sx={{ fontSize: "25px"}}/>
                            <FormControl variant="standard" value ={fullName}>
                                <Select
                                    value={fullName}
                                    sx= {{
                                        backgroundColor: neutralLight,
                                        width: "150px",
                                        borderRadius: "0.25rem",
                                        p: "0.25rem 1 rem",
                                        "& .MuiSvgIcon-root": {
                                            pr: "0.25rem",
                                            width: "3 rem"
                                        },
                                        "& .MuiSelect=select:focus": {
                                            backgroundColor: neutralLight
                                        }
                                    }}
                                    input={<InputBase/>}
                                >
                                    <MenuItem value={fullName}>
                                        <Typography>{fullName}</Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => dispatch(setLogout())}>Logout</MenuItem>

                                </Select>
                            </FormControl>
                        </FlexBetween>
                    </Box>
                ) }
    </FlexBetween>; // Css properties Only available to Box component
}
export default NavBar