import { redirectTo, RouteComponentProps } from "@reach/router";
import React, { FC } from "react";
import { RestaurantDetail } from "../components/restaurant/RestaurantDetail";

const StartPage: FC<RouteComponentProps<{ id: string }>> = ({ id }) => {
  if (!id) {
    redirectTo("/");
    return <p>Redirecting to start</p>;
  }

  return <RestaurantDetail id={id} />;
};

export default StartPage;
