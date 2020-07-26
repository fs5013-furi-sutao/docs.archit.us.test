import React from "react";
import classNames from "classnames";

import "./style.scss";

export function makeWrapperId(slug) {
  return `__internal-${slug}`;
}

function createHeading({ component: Component, rightLink = false }) {
  const heading = ({ children, id, ...rest }) => {
    return (
      <div className={classNames("anchor-wrapper", `anchor--${Component}`)} id={makeWrapperId(id)}>
        <a className="anchor" name={id}>
          {" "}
        </a>
        <Component {...rest}>
          {children}
          <a
            className={classNames("heading-link", `heading-${Component}`, {
              right: rightLink
            })}
            href={`#${id}`}
          >
            <span className="heading-link--icon" />
          </a>
        </Component>
      </div>
    );
  };
  heading.displayName = `Heading-${Component}`;
  return heading;
}

export default createHeading;
