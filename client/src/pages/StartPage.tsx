import React, { FC } from "react";
import { RouteComponentProps } from "@reach/router";
import { RestaurantOverview } from "../components/restaurant/RestaurantOverview";

const StartPage: FC<RouteComponentProps<{}>> = () => <RestaurantOverview />;

export default StartPage;
