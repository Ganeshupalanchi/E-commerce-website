import React from "react";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const Title = ({ level, children = "", className = "" }) => {
  const Heading = `h${level}`;
  const classes = `font-medium ${
    level === 1
      ? "text-[60px] font-[600] text-primary"
      : level === 2
        ? "text-[40px] font-[700] text-primary"
        : level === 3
          ? "text-[28px] font-[700] text-primary"
          : level === 4
            ? "text-[24px] font-[600] text-primary"
            : level === 5
              ? "text-[22px] font-[600] text-primary"
              : "text-[18px] font-[500] text-primary"
  }`;
  return <Heading className={`${className} ${classes} `}>{children}</Heading>;
};

const BodyOne = ({ children, className }) => {
  const classes = "text-lg font-normal text-primary-gray mb-4";
  return <p className={`${className} ${classes}`}> {children}</p>;
};
const BodyTwo = ({ children }) => {
  return <p className="text-base font-semibold text-white">{children}</p>;
};

const Span = ({ children }) => {
  return <span className="text-xs font-semibold text-white">{children}</span>;
};

const CustomNavLink = ({ href, className, children, onClick = "" }) => {
  const linkStyles =
    "text-[15px] font-medium text-gray-600 cursor-pointer list-none";
  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        isActive
          ? `${className} ${linkStyles} text-primary-green`
          : `${className} ${linkStyles} text-white lg:text-black`
      }
      onClick={onClick}
    >
      {children}
    </NavLink>
  );
};
const Caption = ({ children }) => {
  return <p className="text-sm font-normal text-primary-gray">{children}</p>;
};
const CustomLink = ({ className, children }) => {
  const linkStyles = "text-[15px] font-medium  cursor-pointer list-none";
  return <NavLink className={`${className} ${linkStyles}`}>{children}</NavLink>;
};

const Badges = ({ color, children }) => {
  return (
    <div
      className={`h-[18px] w-[18px] ${color} flex justify-center rounded-full text-[12px]`}
    >
      {children}
    </div>
  );
};

export {
  CustomNavLink,
  CustomLink,
  BodyTwo,
  Badges,
  Title,
  BodyOne,
  Caption,
  Span,
};

// CustomNavLink.propTypes = {
//   href: PropTypes.isRequired,
//   className: PropTypes.isRequired,
//   children: PropTypes.isRequired,
// };
// CustomLink.propTypes = {
//   className: PropTypes.isRequired,
//   children: PropTypes.isRequired,
// };
// Badges.propTypes = {
//   color: PropTypes.isRequired,
//   children: PropTypes.isRequired,
// };
// CustomLink.propTypes
