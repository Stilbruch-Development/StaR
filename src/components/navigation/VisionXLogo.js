import React from "react";
import VisionXLogoSVG from "../../images/styled_images/VisionXLogo";
import StyledLink from "../styled_components/StyledLink";
import useExternalLink from "../../hooks/useExternalLink";

const VisionXLogo = (props) => {
  const [goToExternalLink] = useExternalLink();

  const onClickLogo = () => {
    goToExternalLink("https://www.visionx.dev");
  };

  return (
    <StyledLink
      data-testid="VisionXLogo"
      style={{ width: props.width }}
      // to={props.navLink}
      to={"/"}
      scroll={(el) => el.scrollIntoView({ behavior: "smooth", block: "end" })}
      onClick={() => {
        onClickLogo();
      }}
    >
      <VisionXLogoSVG />
    </StyledLink>
  );
};

export default VisionXLogo;
