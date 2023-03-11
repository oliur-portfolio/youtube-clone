import IconButton from "@mui/material/IconButton";
import { BiVideoPlus } from "react-icons/bi";
import Badge from "@mui/material/Badge";
import { AiOutlineBell } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { showSidebar, showVideo } from "../redux/commonSlice";
import { loginError, loginOut, userDataState } from "../redux/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { HiOutlineUserCircle } from "react-icons/hi";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import PersonAdd from "@mui/icons-material/PersonAdd";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useState } from "react";
import { publicReq } from "../apiRequest";
import { toast } from "react-toastify";

const Header = () => {
    const dispatch = useDispatch();
    const user = useSelector(userDataState);
    const navigate = useNavigate();

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogOut = async () => {
        try {
            const res = await publicReq.post("auth/signout", null, {
                withCredentials: true,
            });

            dispatch(loginOut());
            navigate("/login");
        } catch (err) {
            dispatch(loginError(err));
            toast.error(err.message);
        }
    };

    const handleHumberger = () => {
        dispatch(showSidebar());
    };

    return (
        <header>
            <div className="flex justify-between py-[10px] pr-[30px]">
                <div className="flex items-center gap-[18px] relative pl-[12px]">
                    <IconButton onClick={handleHumberger}>
                        <MenuIcon className="!w-[24px] !h-[24px] !text-[#000]" />
                    </IconButton>

                    <Link to="/" className="w-fit h-[20px]">
                        <img src="/images/logo.png" alt="logo" />
                    </Link>
                </div>

                <div className="flex items-center gap-[15px]">
                    <IconButton onClick={() => dispatch(showVideo())}>
                        <BiVideoPlus className="!w-[24px] !h-[24px] !text-[#000]" />
                    </IconButton>

                    <IconButton>
                        <Badge badgeContent={4} color="error">
                            <AiOutlineBell className="!w-[24px] !h-[24px] !text-[#000]" />
                        </Badge>
                    </IconButton>

                    {user ? (
                        <>
                            <Avatar
                                onClick={handleClick}
                                size="small"
                                sx={{ ml: 2 }}
                                aria-controls={
                                    open ? "account-menu" : undefined
                                }
                                aria-haspopup="true"
                                aria-expanded={open ? "true" : undefined}
                                className="!w-[32px] !h-[32px] !ml-4 cursor-pointer !object-cover"
                                alt={user?.username}
                                src={user.image?.url || user?.googleImage}
                            ></Avatar>

                            <Menu
                                anchorEl={anchorEl}
                                id="account-menu"
                                open={open}
                                onClose={handleClose}
                                onClick={handleClose}
                                PaperProps={{
                                    elevation: 0,
                                    sx: {
                                        overflow: "visible",
                                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                                        mt: 1.5,
                                        "& .MuiAvatar-root": {
                                            width: 32,
                                            height: 32,
                                            ml: -0.5,
                                            mr: 1,
                                        },
                                        "&:before": {
                                            content: '""',
                                            display: "block",
                                            position: "absolute",
                                            top: 0,
                                            right: 14,
                                            width: 10,
                                            height: 10,
                                            bgcolor: "background.paper",
                                            transform:
                                                "translateY(-50%) rotate(45deg)",
                                            zIndex: 0,
                                        },
                                    },
                                }}
                                transformOrigin={{
                                    horizontal: "right",
                                    vertical: "top",
                                }}
                                anchorOrigin={{
                                    horizontal: "right",
                                    vertical: "bottom",
                                }}
                            >
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> Profile
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <Avatar /> My account
                                </MenuItem>
                                <Divider />
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <PersonAdd fontSize="small" />
                                    </ListItemIcon>
                                    Add another account
                                </MenuItem>
                                <MenuItem onClick={handleClose}>
                                    <ListItemIcon>
                                        <Settings fontSize="small" />
                                    </ListItemIcon>
                                    Settings
                                </MenuItem>
                                <MenuItem onClick={handleLogOut}>
                                    <ListItemIcon>
                                        <Logout fontSize="small" />
                                    </ListItemIcon>
                                    Logout
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link to="/login">
                            <Button
                                className="!flex !items-center !justify-center !gap-[6px] !w-[100px] !h-[34px] border !border-black/10 !text-[#065fd4] !text-[14px] !leading-[1] !font-medium !rounded-full !normal-case !p-0 hover:!bg-[#def1ff] hover:!border-transparent"
                                variant="outlined"
                            >
                                <span>
                                    <HiOutlineUserCircle className="!text-[#065fd4] !w-[24px] !h-[24px]" />
                                </span>
                                Sign in
                            </Button>
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;
