import React from "react";
import InfoBar from "../shared/Infobar";
import SubNavbar from "../shared/SubNavbar";

const InfoBarHeight = 56; // InfoBar balandligi px da

const Header = () => {
  return (
    <>
      {/* InfoBar */}
      <InfoBar />

      {/* SubNavbar */}
      <SubNavbar />
    </>
  );
};

export default Header;
