import React, { useCallback } from "react";
import PropTypes from "prop-types";
import "./BackButton.scss";
import withClickSound from "../common/WithClickSound";
import { useNavigation } from "@/hooks/useNavigation";
import iconArrowLeft from "@/assets/images/icon-arrow-left.svg";

const BackButton = React.memo(function BackButton({ view }) {
  const { navigateTo } = useNavigation();

  const handleClick = useCallback(() => {
    navigateTo(view);
  }, [navigateTo, view]);

  return (
    <img
      alt="Powrót"
      src={iconArrowLeft}
      className="back-button"
      onClick={handleClick}
    />
  );
});

BackButton.propTypes = {
  view: PropTypes.string.isRequired,
};

export default withClickSound(BackButton);
