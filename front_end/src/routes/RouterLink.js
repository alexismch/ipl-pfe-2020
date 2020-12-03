import React from 'react';
import { Link as DomRouterLink } from "react-router-dom";

const RouterLink = React.forwardRef((props, ref) => (
    <DomRouterLink innerRef={ref} {...props} />
  ));

export default RouterLink;