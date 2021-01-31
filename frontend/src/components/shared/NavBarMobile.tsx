import { ArrowLeftOutlined, ArrowRightOutlined, CloseOutlined, LogoutOutlined, MenuOutlined, SearchOutlined, StarOutlined, TeamOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { LOGIN, REGISTER } from "~/constants/routes";
import logo from '~/images/logo.svg';
import { IUser } from "~/types/types";
import Messages from "../main/Messages";
import Notification from "../main/Notification";
import Avatar from "./Avatar";
import SearchInput from "./SearchInput";

interface IProps {
    isAuth: boolean;
    auth: IUser;
    openModal: () => void;
}

const NavBarMobile: React.FC<IProps> = ({ isAuth, auth, openModal }) => {
    const [isOpenSearch, setOpenSearch] = useState(false);
    const [isOpenMenu, setOpenMenu] = useState(false);
    const { pathname } = useLocation();
    const history = useHistory();

    const onClickMenuItem = () => {
        setOpenMenu(false);
    }

    const clickSearchItemCallback = (user: IUser) => {
        setOpenSearch(false);
        history.push(`/user/${user.username}`);
    }

    return isOpenSearch ? (
        <div className="fixed top-0 left-0 flex w-full items-center bg-indigo-700 z-9999 py-2 pr-2 shadow-xl">
            <div
                className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-indigo-500"
                onClick={() => setOpenSearch(false)}
            >
                <ArrowLeftOutlined className="text-white" style={{ fontSize: '18px' }} />
            </div>
            <SearchInput
                clickItemCallback={clickSearchItemCallback}
                inputClassName="w-full"
            />
        </div>
    ) : (
            <nav className="contain flex justify-between z-9999 align-center w-100 bg-white text-gray-700 h-60px py-2 fixed top-0 left-0 w-full shadow-md laptop:shadow-sm">
                <div className="flex items-center space-x-8">
                    {/* ---- LOGO -------- */}
                    <Link
                        to={{
                            pathname: '/',
                            state: { from: pathname }
                        }}
                    >
                        <img src={logo} alt="" className="w-24" />
                    </Link>
                </div>
                {/* ---- NAVICONS FOR MOBILE ---- */}
                <div className="flex items-center space-x-4 laptop:hidden">
                    {isAuth && (
                        <>
                            <div
                                className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200"
                            >
                                <Messages isAuth={isAuth} />
                            </div>
                            <div
                                className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200"
                            >
                                <Notification isAuth={isAuth} />
                            </div>
                        </>
                    )}
                    <div
                        className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200"
                        onClick={() => setOpenSearch(true)}
                    >
                        <SearchOutlined style={{ fontSize: '20px' }} />
                    </div>
                    <div
                        className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200"
                        onClick={() => setOpenMenu(true)}
                    >
                        <MenuOutlined style={{ fontSize: '20px' }} />
                    </div>
                </div>
                {/* ---- NAV DRAWER FOR MOBILE --- */}
                <div className={`flex  flex-col w-full h-screen fixed top-0 right-0 transition-transform  transform ${isOpenMenu ? 'translate-x-0' : 'translate-x-full'} bg-white laptop:hidden`}>
                    <div className="flex items-center justify-between px-4">
                        <h1>Menu</h1>
                        <div
                            className="p-2 rounded-full flex items-center justify-center cursor-pointer hover:bg-gray-200"
                            onClick={() => setOpenMenu(false)}
                        >
                            <CloseOutlined style={{ fontSize: '20px' }} />
                        </div>
                    </div>
                    {isAuth ? (
                        <ul className="divide-y divide-gray-100">
                            <li className="px-4 py-3 pb-4 cursor-pointer hover:bg-indigo-100">
                                <Link
                                    className="flex font-medium"
                                    onClick={onClickMenuItem}
                                    to={`/user/${auth.username}`}
                                >
                                    <Avatar url={auth.profilePicture} size="lg" className="mr-2" />
                                    <div className="flex flex-col">
                                        <span>{auth.username}</span>
                                        <span className="text-gray-400 text-xs">View Profile</span>
                                    </div>
                                </Link>
                            </li>
                            <li className="p-4 cursor-pointer hover:bg-indigo-100">
                                <Link
                                    className="flex items-center text-black"
                                    onClick={onClickMenuItem}
                                    to={`/user/${auth.username}/following`}
                                >
                                    <TeamOutlined className="text-indigo-700" style={{ fontSize: '30px', marginRight: '25px' }} />
                                    <h6 className="text-sm">Following</h6>
                                </Link>
                            </li>
                            <li className="p-4 cursor-pointer hover:bg-indigo-100">
                                <Link
                                    className="flex items-center text-black"
                                    onClick={onClickMenuItem}
                                    to={`/user/${auth.username}/followers`}
                                >
                                    <TeamOutlined className="text-indigo-700" style={{ fontSize: '30px', marginRight: '25px' }} />
                                    <h6 className="text-sm">Followers</h6>
                                </Link>
                            </li>
                            <li className="p-4 cursor-pointer hover:bg-indigo-100">
                                <Link
                                    className="flex items-center text-black"
                                    onClick={onClickMenuItem}
                                    to={`/user/${auth.username}/bookmarks`}
                                >
                                    <StarOutlined className="text-indigo-700" style={{ fontSize: '30px', marginRight: '25px' }} />
                                    <h6 className="text-sm">Bookmarks</h6>
                                </Link>
                            </li>
                            <li className="p-4 cursor-pointer hover:bg-indigo-100">
                                <div
                                    className="flex items-center text-black"
                                    onClick={() => {
                                        openModal();
                                        setOpenMenu(false);
                                    }}
                                >
                                    <LogoutOutlined className="text-red-500" style={{ fontSize: '30px', marginRight: '25px' }} />
                                    <h6 className="text-sm text-red-500">Logout</h6>
                                </div>
                            </li>
                        </ul>
                    ) : (
                            <ul className="divide-y divide-gray-100">
                                <li className="px-4 cursor-pointer hover:bg-indigo-100 flex items-center">
                                    <ArrowRightOutlined className="flex items-center justify-center" />
                                    <Link
                                        className="p-4 font-medium"
                                        to={LOGIN}
                                    >
                                        Login
                                    </Link>
                                </li>
                                <li className="px-4 cursor-pointer hover:bg-indigo-100 flex items-center">
                                    <ArrowRightOutlined className="flex items-center justify-center" />
                                    <Link
                                        className="p-4 font-medium"
                                        to={REGISTER}
                                    >
                                        Register
                                    </Link>
                                </li>
                            </ul>
                        )}
                    {/* --- COPYRIGHT -- */}
                    <span className="text-gray-400 text-xs absolute bottom-8 left-0 right-0 mx-auto text-center">
                        &copy;Copyright {new Date().getFullYear()} Foodie
                    </span>
                </div>
            </nav>
        )
};

export default NavBarMobile;